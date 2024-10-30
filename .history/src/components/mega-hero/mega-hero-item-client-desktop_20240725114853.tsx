"use client";
import { FC, RefObject, useCallback, useMemo, useRef } from "react";
import { useEffect } from "react";
import React from "react";

import clsx from "clsx";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { Observer } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useVideo } from "@/context/video";
import { hasProjectData } from "@/lib/helpers";

import { LinkComponent } from "../link/link-component";
import { MuxLoading } from "../mux/mux-loading";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

gsap.registerPlugin(ScrollTrigger, Observer);

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false, loading: () => <MuxLoading /> }
);

type MegaHeroItemProps<T extends HTMLElement> = {
    item: ItemWithMuxData;
    carousel: RefObject<T>;
};

export const MegaHeroItemClientDesktop: FC<MegaHeroItemProps<HTMLElement>> = ({
    item,
    carousel,
}) => {
    const {
        project: projectProps,
        bypass_video,
        muxData,
        autoplay: autoPlayProp,
        alwayson,
        bypass_popup_resume_at_timestamp,
        bypass_video_label_name,
    } = item;
    const itemContainer = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemContainer, {
        root: carousel,
        amount: 0.6,
        margin: "0px 0px 0px -60px",
    });
    const aspectRatio = muxData?.aspectRatio;
    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isPopupOpen,
        isContainerTouched,
        showMobileVersion,
    } = useMegaHeroApi();
    const { startTime, videoId } = useVideo();

    const itemIsActive = useMemo(
        () => (activeItem ? item === activeItem : undefined),
        [item, activeItem]
    );

    const videoTimeBeginning = useMemo(() => {
        const defaultTime = 0;
        const sameVideo = bypass_video === videoId;

        if (sameVideo) {
            return bypass_popup_resume_at_timestamp
                ? defaultTime
                : startTime ?? defaultTime;
        } else {
            return defaultTime;
        }
    }, [startTime, bypass_popup_resume_at_timestamp, bypass_video, videoId]);

    //Effect to handle the item dim effect
    useEffect(() => {
        const video = itemContainer.current?.querySelector(
            ".carousel_video"
        ) as HTMLAnchorElement | HTMLDivElement;

        if (!video) return;

        const undimVideo = () => {
            gsap.to(video, {
                filter: "opacity(100%)",
                duration: 0.5,
                ease: "linear",
                delay: 0,
            });
        };

        const dimVideo = () => {
            if (activeItem && !itemIsActive)
                gsap.to(video, {
                    filter: "opacity(70%)",
                    duration: 0.3,
                    ease: "power1.out",
                    delay: 0,
                });
        };

        if (activeItem && !itemIsActive) {
            dimVideo();
        } else {
            undimVideo();
        }
    }, [itemIsActive, activeItem, itemContainer]);

    // useEffect(() => {
    //     if (!showMobileVersion) return;

    //     if (isInView && isContainerTouched) {
    //         setItem(item);
    //     }
    // }, [showMobileVersion, isInView, item, isContainerTouched, setItem]);

    useEffect(() => {
        if (
            itemContainer.current &&
            carousel.current &&
            isContainerTouched &&
            showMobileVersion
        ) {
            ScrollTrigger.create({
                scroller: carousel.current,
                trigger: itemContainer.current,
                markers: true,
                horizontal: true,
                start: "left 0%", // Adjust this value to match the [`amount`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fecolekoenig%2FGitFolders%2Fprismic-test-effe%2Fnode_modules%2Fframer-motion%2Fdist%2Findex.d.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A4833%2C%22character%22%3A4%7D%5D "node_modules/framer-motion/dist/index.d.ts") and [`margin`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fecolekoenig%2FGitFolders%2Fprismic-test-effe%2Fnode_modules%2Fframer-motion%2Fdist%2Findex.d.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A4185%2C%22character%22%3A4%7D%5D "node_modules/framer-motion/dist/index.d.ts") from [`useInView`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fecolekoenig%2FGitFolders%2Fprismic-test-effe%2Fnode_modules%2Fframer-motion%2Fdist%2Findex.d.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A4835%2C%22character%22%3A0%7D%5D "node_modules/framer-motion/dist/index.d.ts")
                end: "right 60%", // Adjust this value as needed
                onEnter: () => {
                    setItem(item);
                },
                onLeave: () => {
                    // Handle the element leaving the view
                    console.log("Element is out of view");
                },
                onEnterBack: () => {
                    // Handle the element re-entering the view from the bottom
                    setItem(item);
                },
                onLeaveBack: () => {
                    // Handle the element leaving the view from the top
                    console.log("Element is out of view again");
                },
            });
        }

        return () => {
            ScrollTrigger.killAll();
        };
    }, [carousel, isContainerTouched, setItem, item, showMobileVersion]);

    useEffect(() => {
        let x = 0;
        const element = itemContainer.current;
        const elementContainerScrollWidth = carousel?.current?.scrollWidth;

        if (showMobileVersion) {
            return () => {
                gsap.killTweensOf(element);
                ScrollTrigger.killAll();
            };
        }

        const scrollTo = ({
            delta,
            options,
        }: {
            delta: number;
            options?: {
                direction?: number;
                sensivity?: number;
            };
        }) => {
            const direction = options?.direction ?? -1;
            const sensivity = options?.sensivity ?? 0.5;

            const elementContainer = carousel.current;
            const placeHolderWidth = document
                ?.querySelector(".carousel_placeholder")
                ?.getBoundingClientRect().width;
            const elementContainerClientWidth =
                elementContainer?.getBoundingClientRect().width;

            const condition =
                elementContainerClientWidth &&
                elementContainerScrollWidth &&
                placeHolderWidth;

            if (!condition) return 0;

            const maxScrollWidth =
                elementContainerScrollWidth - elementContainerClientWidth;
            const scrollEnd = showMobileVersion
                ? placeHolderWidth - (2 * placeHolderWidth) / 3
                : placeHolderWidth - 20;
            const offset = showMobileVersion
                ? -1 * (maxScrollWidth + scrollEnd)
                : -1 * (maxScrollWidth + scrollEnd);

            x += delta * sensivity * direction; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits

            return x;
        };

        const handleInteract: Observer.ObserverCallback = (e) => {
            const direction = e.isDragging ? 1 : -1;
            const sensivity = e.isDragging ? 1 : 0.5;
            const duration = e.isDragging ? 1 : 0.66;
            const ease = e.isDragging ? "power1.inOut" : "power1.out";

            if (e.deltaY) {
                gsap.to(element, {
                    x: () =>
                        scrollTo({
                            delta: e.deltaY,
                            options: { direction, sensivity },
                        }),
                    duration,
                    ease,
                    immediateRender: true,
                    onUpdate: ScrollTrigger.update,
                });
            }
            if (e.deltaX) {
                gsap.to(element, {
                    x: () =>
                        scrollTo({
                            delta: e.deltaX,
                            options: { direction, sensivity },
                        }),
                    duration,
                    ease,
                    immediateRender: true,
                    onUpdate: ScrollTrigger.update,
                });
            }
        };

        const setupScrollTrigger = () => {
            if (showMobileVersion) return;
            ScrollTrigger.observe({
                target: document.body,
                type: "wheel, touch",
                onChange: handleInteract,
            });
            ScrollTrigger.normalizeScroll(true);
        };

        setupScrollTrigger();

        return () => {
            gsap.killTweensOf(element);
            ScrollTrigger.killAll();
        };
    }, [carousel, itemContainer, showMobileVersion]);

    const { className, styles: styleds } = css.resolve`
        :global(body) {
            overflow: hidden;
        }
    `;

    const handleOpen = () => {
        setIsPopupOpen(true);
    };

    const handleSetItem = useCallback(() => {
        if (showMobileVersion) return;
        setItem(item);
    }, [item, setItem, showMobileVersion]);

    const handleClearItem = useCallback(() => {
        if (showMobileVersion) return;
        setItem(undefined);
    }, [setItem, showMobileVersion]);

    const reelVideo = item.bypass_video ? item.muxData : undefined;
    const project = hasProjectData(projectProps)
        ? projectProps.data
        : undefined;
    const projectVideo = project?.video;
    const label = bypass_video_label_name ?? project?.title;

    return (
        <li
            className={clsx(styles.item, className, "carousel_item")}
            onFocus={handleSetItem}
            onTouchStart={handleSetItem}
            onMouseOver={handleSetItem}
            onTouchEnd={handleClearItem}
            onMouseLeave={handleClearItem}
            ref={itemContainer}
        >
            {styleds}
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div
                className={clsx(styles.thumbnail_container, "carousel_video")}
                style={{ aspectRatio }}
            >
                {!bypass_video && project && projectVideo && (
                    <LinkComponent
                        key={projectVideo}
                        field={projectProps}
                        prefetch
                        style={{ aspectRatio }}
                        aria-label={project.title as string}
                    >
                        <div className={styles.video}>
                            {/* {showMobileVersion && label && (
                                <div className={styles.item_title}>{label}</div>
                            )} */}
                            <VideoOnHover
                                playbackId={projectVideo}
                                muxData={muxData}
                                containerRef={itemContainer as any}
                                autoPlay={autoPlayProp}
                                alwaysOn={alwayson}
                                imageProps={{
                                    loading: "eager",
                                }}
                            />
                        </div>
                    </LinkComponent>
                )}
                {bypass_video && (
                    <div
                        className={clsx(
                            styles.thumbnail_container,
                            "carousel_video"
                        )}
                        onClick={handleOpen}
                        onKeyDown={(e) =>
                            e.key === "Enter" ? handleOpen() : undefined
                        }
                        aria-label="Showreel"
                        style={{
                            aspectRatio,
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <div className={styles.video}>
                            {/* {showMobileVersion && label && (
                                <div className={styles.item_title}>
                                    <span>
                                        {label}
                                        <Play />
                                    </span>
                                </div>
                            )} */}
                            <VideoOnHover
                                playbackId={bypass_video}
                                muxData={muxData}
                                containerRef={itemContainer as any}
                                autoPlay={autoPlayProp}
                                alwaysOn={alwayson}
                                playerInitTime={videoTimeBeginning}
                                resume={{
                                    canPlay: !isPopupOpen,
                                    time: videoTimeBeginning,
                                }}
                                imageProps={{
                                    loading: "eager",
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
};

"use client";
import { FC, RefObject, useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";
import { isTablet } from "react-device-detect";
import { useMeasure, useWindowSize } from "react-use";

import clsx from "clsx";
import { useInView } from "framer-motion";
import getSize from "get-size";
import gsap from "gsap";
import { Observer } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { get } from "lodash";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { LinkComponent } from "@/components/link/link-component";
import { MuxLoading } from "@/components/mux/mux-loading";
import { useDim } from "@/hooks/useDim";
import { hasClientData, hasProjectData } from "@/lib/helpers";

import { useMegaHeroApi } from "./context";
import { ItemWithMuxData } from "./mega-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

gsap.registerPlugin(ScrollTrigger, Observer);

const VideoOnHover = dynamic(
    () =>
        import("@/components/video/video-on-hover").then(
            (mod) => mod.VideoOnHover
        ),
    { ssr: false, loading: () => <MuxLoading /> }
);

type MegaHeroItemProps<T extends HTMLElement> = {
    item: ItemWithMuxData;
    carousel: RefObject<T>;
};

export const MegaHeroItem: FC<MegaHeroItemProps<HTMLElement>> = ({
    item,
    carousel,
}) => {
    const {
        project: projectProps,
        bypass_video,
        muxData,
        autoplay: autoPlayProp,
        bypass_video_label_name,
    } = item;
    const itemContainer = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemContainer, {
        root: carousel,
        amount: 0.6,
    });
    const aspectRatio = muxData?.aspectRatio;
    const [size, setSize] = useState<ReturnType<typeof getSize>>();
    const windowSize = useWindowSize();

    const { setItem, setIsPopupOpen, isContainerTouched, showMobileVersion } =
        useMegaHeroApi();
    const tabletActive = isTablet;

    useDim();

    useEffect(() => {
        if (!showMobileVersion || tabletActive) return;

        if (isInView && isContainerTouched) {
            setItem(item);
        }
    }, [
        showMobileVersion,
        isInView,
        item,
        isContainerTouched,
        setItem,
        tabletActive,
    ]);

    useEffect(() => {
        const element = itemContainer.current;
        if (!element) return;
        setSize(getSize(itemContainer.current));
        console.log(getSize(itemContainer.current));
    }, [setSize, windowSize, itemContainer]);

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
    const clientName = project?.client
        ? hasClientData(project?.client)
            ? project.client.data.name
            : undefined
        : undefined;

    return (
        <li
            className={clsx(
                styles.item,
                className,
                tabletActive ? styles.darken : undefined,
                "carousel_item",
                "dim-cont"
            )}
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
                className={clsx(styles.thumbnail_container, "dim-el")}
                style={{ aspectRatio }}
            >
                {!bypass_video && project && projectVideo && muxData && (
                    <LinkComponent
                        key={projectVideo}
                        field={projectProps}
                        prefetch
                        style={{ aspectRatio }}
                        aria-label={project.title as string}
                    >
                        <div className={styles.video}>
                            {isTablet && label && (
                                <div className={styles.thumbnail_title}>
                                    {clientName && <div>{clientName}</div>}
                                    {label}
                                </div>
                            )}
                            <VideoOnHover
                                muxData={muxData}
                                containerRef={itemContainer as any}
                                autoPlay={autoPlayProp}
                                imageProps={{
                                    loading: "eager",
                                }}
                            />
                        </div>
                    </LinkComponent>
                )}
                {bypass_video && muxData && (
                    <div
                        className={clsx(styles.thumbnail_container, "dim-el")}
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
                            <VideoOnHover
                                muxData={muxData}
                                containerRef={itemContainer as any}
                                autoPlay={autoPlayProp}
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

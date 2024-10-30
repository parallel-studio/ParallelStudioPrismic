"use client";
import { FC, RefObject, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

import clsx from "clsx";
import gsap from "gsap";
import { Observer } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useLayout } from "@/context/layout";
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

type MegaHeroItemProps = {
    item: ItemWithMuxData;
    container: RefObject<HTMLDivElement>;
};

export const MegaHeroItemClientDesktop: FC<MegaHeroItemProps> = ({
    item,
    container,
}) => {
    const itemContainer = useRef<HTMLLIElement>(null);
    const {
        project,
        bypass_video,
        muxData,
        autoplay: autoPlayProp,
        alwayson,
        bypass_popup_resume_at_timestamp,
    } = item;
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";
    const aspectRatio = muxData?.aspectRatio;
    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isPopupOpen,
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

    useEffect(() => {
        let x = 0;
        const element = itemContainer.current;
        const elementContainerScrollWidth = container?.current?.scrollWidth;

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

            const elementContainer = container.current;
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
            const scrollEnd = isMobileLayoutActive
                ? placeHolderWidth + 40
                : placeHolderWidth - 20;
            const offset = isMobileLayoutActive
                ? 0
                : direction * (maxScrollWidth + scrollEnd);

            x += delta * sensivity * direction; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits

            return x;
        };

        const onBodyWheel: Observer.ObserverCallback = (e) => {
            const direction = e.isDragging ? 1 : -1;
            const sensivity = e.isDragging ? 0.3 : 0.5;
            const duration = e.isDragging ? 0.5 : 0.66;
            if (e.deltaY) {
                gsap.to(element, {
                    x: () =>
                        scrollTo({
                            delta: e.deltaY,
                            options: { direction, sensivity },
                        }),
                    duration,
                    ease: "power1.out",
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
                    ease: "power1.out",
                });
            }
        };

        const setupScrollTrigger = () => {
            ScrollTrigger.observe({
                target: document.body,
                type: "wheel,touch",
                onChange: onBodyWheel,
                onDrag: onBodyWheel,
            });
            ScrollTrigger.normalizeScroll(true);
        };

        setupScrollTrigger();

        return () => {
            gsap.killTweensOf(element);
            ScrollTrigger.killAll();
        };
    }, [container, itemContainer, isMobileLayoutActive]);

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    const { className, styles: styleds } = css.resolve`
        :global(body) {
            overflow: hidden;
        }
    `;

    const handleOpen = () => {
        setIsPopupOpen(true);
    };

    const handleMouseOver = () => {
        setItem(item);
    };

    const handleMouseLeave = () => {
        setItem(undefined);
    };

    return (
        <li
            className={clsx(styles.item, className, "carousel_item")}
            onFocus={handleMouseOver}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            ref={itemContainer}
        >
            {styleds}
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div
                className={clsx(styles.item_container, "carousel_video")}
                style={{ aspectRatio }}
            >
                {project &&
                    hasProjectData(project) &&
                    !bypass_video &&
                    project.data?.video && (
                        <LinkComponent
                            key={project.data.video}
                            field={project}
                            prefetch
                            style={{ aspectRatio }}
                            aria-label={project.data.title as string}
                        >
                            <VideoOnHover
                                playbackId={project.data.video}
                                muxData={muxData}
                                containerRef={itemContainer}
                                autoPlay={autoPlayProp}
                                alwaysOn={alwayson}
                            />
                        </LinkComponent>
                    )}
                {bypass_video && (
                    <div
                        className={clsx(
                            styles.item_container,
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
                        <VideoOnHover
                            playbackId={bypass_video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            autoPlay={autoPlayProp}
                            alwaysOn={alwayson}
                            playerInitTime={videoTimeBeginning}
                            resume={{
                                canPlay: !isPopupOpen,
                                time: videoTimeBeginning,
                            }}
                        />
                    </div>
                )}
            </div>
        </li>
    );
};

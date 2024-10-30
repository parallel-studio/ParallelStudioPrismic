"use client";
import { FC, RefObject, useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";
import { useWindowSize } from "react-use";

import clsx from "clsx";
import gsap from "gsap";
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

gsap.registerPlugin(ScrollTrigger);

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false, loading: () => <MuxLoading /> }
);

type MegaHeroItemProps = {
    item: ItemWithMuxData;
    container: RefObject<HTMLDivElement>;
};

export const MegaHeroItemClientGsap: FC<MegaHeroItemProps> = ({
    item,
    container,
}) => {
    const itemContainer = useRef<HTMLDivElement>(null);
    const {
        project,
        bypass_video,
        muxData,
        autoplay,
        alwayson,
        bypass_popup_resume_at_timestamp,
    } = item;
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const { activeLayout } = useLayout();
    // const isMobileLayoutActive = activeLayout === "mobile";
    const isMobileLayoutActive = false;
    const aspectRatio = muxData?.aspectRatio;
    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isPopupOpen,
    } = useMegaHeroApi();
    const { startTime, videoId } = useVideo();
    const { width: windowWidth } = useWindowSize();

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
        if (activeItem && !itemIsActive) {
            video.style.opacity = "0.7";
        } else {
            video.style.opacity = "1";
        }
    }, [itemIsActive, activeItem, itemContainer]);

    let x = 0;
    const elementContainer = container.current;
    const elementContainerScrollWidth = elementContainer?.scrollWidth;
    let elementContainerClientWidth = elementContainer?.clientWidth;

    const calculateMovement = useCallback(
        ({
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

            const placeHolderWidth = document?.querySelector(
                ".carousel_placeholder"
            )?.clientWidth;

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
                : -maxScrollWidth - scrollEnd * 3;

            x += delta * sensivity * direction; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits

            return x;
        },
        [container, isMobileLayoutActive]
    );

    useEffect(() => {
        const element = itemContainer.current;

        const onBodyWheel: Observer.ObserverCallback = (e) => {
            const direction = e.isDragging ? 1 : -1;
            const sensivity = e.isDragging ? 0.3 : 0.5;
            const duration = e.isDragging ? 0.5 : 0.5;
            if (e.deltaY) {
                const x = calculateMovement({
                    delta: e.deltaY,
                    options: { direction, sensivity },
                });

                gsap.to(element, {
                    x,
                    duration,
                    ease: "power1.out",
                });
            }
            // if (e.deltaX) {
            //     gsap.to(element, {
            //         x: calculateMovement({
            //             delta: e.deltaY,
            //             options: { direction, sensivity },
            //         }),
            //         duration,
            //         ease: "power1.out",
            //     });
            // }
        };

        ScrollTrigger.observe({
            target: document.body,
            type: "wheel,touch",
            onChange: onBodyWheel,
            onDrag: onBodyWheel,
        });

        return () => {
            gsap.killTweensOf(element);
            ScrollTrigger.killAll();
        };
    }, [
        container,
        itemContainer,
        isMobileLayoutActive,
        calculateMovement,
        windowWidth,
    ]);

    useEffect(() => {
        elementContainerClientWidth = elementContainer?.clientWidth;
    }, [windowWidth, elementContainer]);

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
        <div
            className={clsx(styles.item, className, "carousel_item")}
            onFocus={handleMouseOver}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            ref={itemContainer}
        >
            {styleds}
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div style={{ aspectRatio }}>
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
                            className="carousel_video"
                        >
                            <VideoOnHover
                                playbackId={project.data.video}
                                muxData={muxData}
                                containerRef={itemContainer}
                                autoPlay={isPlaying}
                                alwaysOn={alwayson}
                            />
                        </LinkComponent>
                    )}
                {bypass_video && (
                    <div
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
                        className="carousel_video"
                    >
                        <VideoOnHover
                            playbackId={bypass_video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            autoPlay={isPlaying}
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
        </div>
    );
};

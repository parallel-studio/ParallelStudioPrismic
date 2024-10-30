"use client";
import { FC, RefObject, useCallback, useMemo, useRef } from "react";
import { useEffect } from "react";
import React from "react";
import { useWindowSize } from "react-use";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useLayout } from "@/context/layout";
import { useVideo } from "@/context/video";
import { hasProjectData } from "@/lib/helpers";

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
    const { project, bypass_video, muxData, autoplay, alwayson } = item;
    // const [isPlaying, setIsPlaying] = useState(autoplay);
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";
    const aspectRatio = muxData?.aspectRatio;
    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isReady,
        isPopupOpen,
    } = useMegaHeroApi();
    const { startTime, videoId } = useVideo();
    const itemIsActive = useMemo(
        () => (activeItem ? item === activeItem : undefined),
        [item, activeItem]
    );
    const { width: windowWidth } = useWindowSize();

    //Effect to handle the item dim effect
    useEffect(() => {
        const anchor = itemContainer.current?.querySelector(
            ".carousel_anchor"
        ) as HTMLAnchorElement | HTMLDivElement;

        if (!anchor) return;
        if (activeItem && !itemIsActive) {
            anchor.style.opacity = "0.7";
        } else {
            anchor.style.opacity = "1";
        }
    }, [itemIsActive, activeItem, itemContainer]);

    const calculateSizes = useCallback(() => {
        const elementContainer = container.current;
        const elementContainerClientWidth = elementContainer?.clientWidth;
        const elementContainerScrollWidth = elementContainer?.scrollWidth;
        const placeHolderWidth = document?.querySelector(
            ".carousel_placeholder"
        )?.clientWidth;

        return {
            elementContainerClientWidth,
            elementContainerScrollWidth,
            placeHolderWidth,
        };
    }, [container]);

    useEffect(() => {
        const element = itemContainer.current;

        const {
            elementContainerClientWidth,
            elementContainerScrollWidth,
            placeHolderWidth,
        } = calculateSizes();

        const condition =
            elementContainerClientWidth &&
            elementContainerScrollWidth &&
            placeHolderWidth;

        if (!condition) return;

        let x = 0;
        const maxScrollWidth =
            elementContainerScrollWidth - elementContainerClientWidth;
        const scrollEnd = isMobileLayoutActive
            ? placeHolderWidth + 40
            : placeHolderWidth - 20;

        const offset = isMobileLayoutActive ? 0 : -maxScrollWidth - scrollEnd;

        const onBodyWheel = (e: WheelEvent) => {
            if (e.deltaY) {
                x += -e.deltaY * 0.5; // Adjust scroll speed
                x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
                e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
            }
            if (e.deltaX) {
                x += -e.deltaX * 0.5; // Adjust scroll speed for horizontal movement
                x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
                e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
            }
        };

        ScrollTrigger.create({
            trigger: container.current,
            onEnter: () => {
                document.body.addEventListener("wheel", onBodyWheel, {
                    passive: false,
                });
            },
            onLeave: () => {
                document.body.removeEventListener("wheel", onBodyWheel);
            },
            onUpdate: () => {
                document.body.removeEventListener("wheel", onBodyWheel);
            },
        });

        // Debounce resize handler to prevent too frequent updates
        const handleResize = () => {
            // Kill existing tweens before creating new ones
            gsap.killTweensOf(element);
        };

        // Listen to resize events
        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
            // Kill tweens and ScrollTriggers to prevent memory leaks
            gsap.killTweensOf(element);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [
        container,
        itemContainer,
        isMobileLayoutActive,
        calculateSizes,
        windowWidth,
    ]);

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
                        <PrismicNextLink
                            key={project.data.video}
                            field={project}
                            prefetch
                            style={{ aspectRatio }}
                            aria-label={project.data.title as string}
                            className="carousel_anchor"
                        >
                            <VideoOnHover
                                playbackId={project.data.video}
                                muxData={muxData}
                                containerRef={itemContainer}
                                // autoPlay={isPlaying}
                                // alwaysOn={alwayson}
                            />
                        </PrismicNextLink>
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
                        className="carousel_anchor"
                    >
                        <VideoOnHover
                            playbackId={bypass_video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            autoPlay={true}
                            alwaysOn={alwayson}
                            playerInitTime={
                                isFilled.number(
                                    item.bypass_video_thumbnail_time
                                )
                                    ? item.bypass_video_thumbnail_time
                                    : undefined
                            }
                            resume={{ canPlay: !isPopupOpen, time: startTime }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

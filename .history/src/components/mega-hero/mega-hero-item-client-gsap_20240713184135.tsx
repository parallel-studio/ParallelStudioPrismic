"use client";
import { FC, RefObject, useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

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
    const linkContainer = useRef<HTMLAnchorElement>(null);
    const { project, bypass_video, muxData, autoplay, alwayson } = item;
    const [isHovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [placeHolderWidth, setPlaceHolderWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
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

    useEffect(() => {
        if (isReady && isHovering && !isMobileLayoutActive) {
            setItem(item);
        } else if (isHovering === false && item === activeItem) {
            setItem(undefined);
        }
    }, [isHovering, item, setItem, activeItem, isMobileLayoutActive, isReady]);

    useLayoutEffect(() => {
        const handleResize = () => {
            const placeHolderScrollWidth = document?.querySelector(
                ".carousel_placeholder"
            )?.clientWidth;
            if (placeHolderScrollWidth)
                setPlaceHolderWidth(placeHolderScrollWidth);
            const containerClientWidth = container.current?.clientWidth;
            if (containerClientWidth) setContainerWidth(containerClientWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [container]);

    useEffect(() => {
        const element = itemContainer.current;
        const elementContainer = container.current;

        const condition = !element || !elementContainer || !placeHolderWidth;

        console.log(condition);

        if (!element || !elementContainer || !placeHolderWidth) return;

        let x = 0; // Current position of the carousel
        const maxScrollWidth =
            elementContainer.scrollWidth - elementContainer.clientWidth;
        const scrollEnd = isMobileLayoutActive
            ? placeHolderWidth + 40
            : placeHolderWidth - 20;

        const offset = isMobileLayoutActive ? 0 : -maxScrollWidth - scrollEnd;

        const onBodyWheel = (e: WheelEvent) => {
            if (e.deltaY) {
                x += -e.deltaY * 0.5; // Adjust scroll speed
                x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
            }
            if (e.deltaX) {
                x += -e.deltaX * 0.5; // Adjust scroll speed for horizontal movement
                x = Math.max(Math.min(x, 0), offset); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
                e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
            }
        };

        window.addEventListener("wheel", onBodyWheel);
        return () => {
            window.removeEventListener("wheel", onBodyWheel);
        };
    }, [container, itemContainer, isMobileLayoutActive, placeHolderWidth]);

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    const { className, styles: styleds } = css.resolve`
        :global(body) {
            overflow: hidden;
        }
    `;

    // const applyDimEffect = () => {
    //     (
    //         document.querySelectorAll(
    //             ".carousel_item"
    //         ) as NodeListOf<HTMLDivElement>
    //     ).forEach((otherItem) => {
    //         if (otherItem !== itemContainer.current) {
    //             const anchor = otherItem.querySelector(".carousel_anchor") as
    //                 | HTMLAnchorElement
    //                 | HTMLDivElement;
    //             if (anchor) {
    //                 anchor.style.transition = "filter 0.3s ease 0.1s";
    //                 anchor.style.filter = "opacity(0.7)";
    //             }
    //         }
    //     });
    // };

    // const removeDimEffect = () => {
    //     (
    //         document.querySelectorAll(
    //             ".carousel_item"
    //         ) as NodeListOf<HTMLDivElement>
    //     ).forEach((otherItem) => {
    //         const anchor = otherItem.querySelector(".carousel_anchor") as
    //             | HTMLAnchorElement
    //             | HTMLDivElement;
    //         if (anchor) {
    //             anchor.style.filter = "";
    //             anchor.style.transition = "";
    //         }
    //     });
    // };

    const handleOpen = () => {
        setIsPopupOpen(true);
    };

    const handleMouseOver = () => {
        // applyDimEffect();
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        // removeDimEffect();
        setIsHovering(false);
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
                                autoPlay={isPlaying}
                                alwaysOn={false}
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
                            autoPlay={false}
                            alwaysOn={false}
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

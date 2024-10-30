"use client";
import Draggable from "gsap/Draggable";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { FC, RefObject, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { useLayout } from "@/context/layout";
import { hasProjectData } from "@/lib/helpers";

import { MuxLoading } from "../mux/mux-loading";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";
gsap.registerPlugin(ScrollTrigger, Draggable);

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
    const [isHovering, setIsHovering] = useState(false);
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";
    const { project, bypass_video, muxData } = item;
    const aspectRatio = muxData?.aspectRatio;

    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isReady,
    } = useMegaHeroApi();

    useEffect(() => {
        if (isReady && isHovering && !isMobileLayoutActive) {
            setItem(item);
        } else if (isHovering === false && item === activeItem) {
            setItem(undefined);
        }
    }, [isHovering, item, setItem, activeItem, isMobileLayoutActive, isReady]);

    useEffect(() => {
        const element = itemContainer.current;
        if (!element) return;

        let x = 0; // Current position of the carousel
        const maxScrollWidth = element.scrollWidth - element.clientWidth;

        const onBodyWheel = (e: WheelEvent) => {
            // Translate vertical scrolling into horizontal movement for the carousel
            x += -e.deltaY * 0.5; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
            gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
        };

        const onCarouselWheel = (e: WheelEvent) => {
            // Direct horizontal scrolling on the carousel
            if (e.deltaX) {
                x += -e.deltaX * 0.5; // Adjust scroll speed for horizontal movement
                x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
                e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
            }
        };

        window.addEventListener("wheel", onBodyWheel);
        element.addEventListener("wheel", onCarouselWheel);

        const draggableInstance = Draggable.create(element, {
            type: "x",
            inertia: true,
            bounds: { minX: 0, maxX: -maxScrollWidth }, // Adjust according to your carousel's width
            onDrag: function () {
                // Optional: Callback for additional actions during drag
            },
        });

        return () => {
            window.removeEventListener("wheel", onBodyWheel);
            element.removeEventListener("wheel", onCarouselWheel);
            draggableInstance[0].kill();
        };
    }, []);

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    return (
        <div
            className={clsx(styles.item)}
            onFocus={() => setIsHovering(true)}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div style={{ aspectRatio }} ref={itemContainer}>
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
                        >
                            <VideoOnHover
                                playbackId={project.data.video}
                                muxData={muxData}
                                containerRef={itemContainer}
                            />
                        </PrismicNextLink>
                    )}
                {bypass_video && (
                    <div
                        onClick={() => setIsPopupOpen(true)}
                        onKeyDown={(e) =>
                            e.key === "Enter" ? setIsPopupOpen(true) : undefined
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
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

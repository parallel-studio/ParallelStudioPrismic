"use client";

import { FC, RefObject, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import {
    easeIn,
    easeInOut,
    easeOut,
    motion,
    MotionValue,
    useScroll,
    useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";

import { hasProjectData } from "@/lib/helpers";
import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false }
);

type MegaHeroItemProps = {
    item: ItemWithMuxData;
    container: RefObject<HTMLDivElement>;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = ({
    item,
    container,
}) => {
    const itemContainer = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const { isMobileLayoutActive } = useLayout();
    const { scrollY } = useScroll();
    const [distanceToScroll, setDistanceToScroll] = useState(0);
    const [placeholderWidth, setplaceholderWidth] = useState(300);
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
        const handleResize = () => {
            const placeholderWidth = document.querySelector(
                ".carousel_placeholder"
            )?.clientWidth;
            if (placeholderWidth) {
                setplaceholderWidth(placeholderWidth);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const END_OF_SCROLL = isMobileLayoutActive
        ? placeholderWidth + 40
        : placeholderWidth + 20;

    useEffect(() => {
        const handleResize = () => {
            const scrollWidth =
                itemContainer.current?.parentElement?.parentElement
                    ?.scrollWidth;
            const clientWidth = window.innerWidth;

            if (scrollWidth && clientWidth) {
                setDistanceToScroll(scrollWidth - clientWidth);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [container, itemContainer]);

    const useSlide = (value: MotionValue<number>, distance: number) => {
        return useTransform(
            value,
            [0, distanceToScroll],
            [0, -distance - END_OF_SCROLL]
        );
    };

    const scrollXProgress = useSlide(scrollY, distanceToScroll);

    return (
        <motion.div
            className={clsx(styles.item)}
            style={{ x: scrollXProgress }}
            initial={{ x: 0 }}
            onFocus={() => setIsHovering(true)}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
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
        </motion.div>
    );
};

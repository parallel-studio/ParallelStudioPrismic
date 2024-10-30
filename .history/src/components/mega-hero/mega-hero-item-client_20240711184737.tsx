"use client";

import { FC, RefObject, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

import { useLayout } from "@/context/layout";
import { hasProjectData } from "@/lib/helpers";

import { MuxLoading } from "../mux/mux-loading";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false, loading: () => <MuxLoading /> }
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
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";
    const { scrollYProgress } = useScroll();
    const [scrollOffset, setScrollOffset] = useState(300);
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
            const scrollWidth =
                itemContainer.current?.parentElement?.parentElement
                    ?.scrollWidth;
            const clientWidth = window.innerWidth;
            const placeholderWidth = document.querySelector(
                ".carousel_placeholder"
            )?.clientWidth;

            if (scrollWidth && clientWidth && placeholderWidth) {
                const distanceToScroll = scrollWidth - clientWidth;
                const scrollEnd = isMobileLayoutActive
                    ? placeholderWidth + 40
                    : placeholderWidth + 40;

                const offset = isMobileLayoutActive
                    ? -distanceToScroll - scrollEnd
                    : -distanceToScroll - scrollEnd;

                setScrollOffset(offset);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobileLayoutActive, container, itemContainer]);

    const scrollXProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, scrollOffset]
    );

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    return (
        <motion.div
            className={clsx(styles.item)}
            style={{ x: scrollXProgress }}
            initial={{ x: 0 }}
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
        </motion.div>
    );
};

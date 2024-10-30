"use client";

import { FC, useRef, useState } from "react";
import { useEffect } from "react";
import React from "react";

import MuxVideo from "@mux/mux-video-react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Image from "next/image";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { useLayout } from "@/lib/mobile-layout";
import muxLoader from "@/lib/mux-loader";

import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";

type MegaHeroItemProps = {
    item: ItemWithMuxData;
    variant?: "mobile" | "desktop";
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = ({
    item,
    variant = "desktop",
}) => {
    const { isMobileLayoutActive } = useLayout();
    const [isVideoReady, setIsVideoReady] = useState(false);

    const { project, bypass_video, muxData } = item;

    const blurDataURL = muxData?.blurDataURL;
    const aspectRatio = muxData?.aspectRatio;
    const imageURL = muxData?.imageURL;
    const imageDataURL = muxData?.imageDataURL;

    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isReady,
    } = useMegaHeroApi();
    const videoRef = useRef<HTMLVideoElement>(null);
    // const [videoRef, setVideoRef] = useState<HTMLVideoElement>();
    const containerRef = useRef<HTMLDivElement>(null);

    const { isHovering, hasStarted } = useVideoStart({
        videoRef: videoRef.current ?? undefined,
        containerRef,
    });

    useEffect(() => {
        if (isReady && isHovering && !isMobileLayoutActive) {
            setItem(item);
        } else if (isHovering === false && item === activeItem) {
            setItem(undefined);
        }
    }, [isHovering, item, setItem, activeItem, isMobileLayoutActive, isReady]);

    return (
        <div className={clsx(styles.item, styles[`item_${variant}`])}>
            <div style={{ aspectRatio }} ref={containerRef}>
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
                            {imageURL && aspectRatio && (
                                <Image
                                    src={project.data.video}
                                    width={aspectRatio * 300}
                                    height={300}
                                    alt=""
                                    loader={muxLoader}
                                    placeholder={"blur"}
                                    blurDataURL={imageDataURL}
                                    style={{
                                        display: hasStarted ? "none" : "block",
                                    }}
                                />
                            )}
                            {!isMobileLayoutActive && (
                                <MuxVideo
                                    ref={videoRef}
                                    streamType="on-demand"
                                    playbackId={project.data.video}
                                    loop
                                    muted
                                    style={{
                                        aspectRatio,
                                        // display: hasStarted ? "block" : "none",
                                        backgroundImage: `url(${imageURL})`,
                                        backgroundSize: "cover",
                                    }}
                                    poster={imageURL?.href}
                                    onCanPlayThrough={() =>
                                        setIsVideoReady(true)
                                    }
                                />
                            )}
                        </PrismicNextLink>
                    )}
                {bypass_video && (
                    <div
                        className={clsx(styles.item, styles[`item_${variant}`])}
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
                        {imageURL && aspectRatio && (
                            <Image
                                src={bypass_video}
                                width={aspectRatio * 300}
                                height={300}
                                alt=""
                                loader={muxLoader}
                                placeholder={"blur"}
                                blurDataURL={imageDataURL}
                                style={{
                                    display:
                                        isHovering && hasStarted
                                            ? "none"
                                            : "block",
                                }}
                            />
                        )}
                        {!isMobileLayoutActive && (
                            <MuxVideo
                                key={bypass_video}
                                ref={videoRef}
                                streamType="on-demand"
                                playbackId={bypass_video}
                                loop
                                muted
                                style={{
                                    aspectRatio,
                                    // display: hasStarted ? "block" : "none",
                                    backgroundImage: `url(${imageURL})`,
                                    backgroundSize: "cover",
                                }}
                                poster={imageURL?.href}
                                onCanPlayThrough={() => setIsVideoReady(true)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

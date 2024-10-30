"use client";

import { FC, useState } from "react";
import { useEffect } from "react";
import React from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { useLayout } from "@/lib/mobile-layout";

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

    const { project, bypass_video } = item;

    const blurDataURL = item.muxData?.blurDataURL;
    const aspectRatio = item.muxData?.aspectRatio;

    const {
        setItem,
        item: activeItem,
        setIsPopupOpen,
        isReady,
    } = useMegaHeroApi();

    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const { isHovering } = useVideoStart({ videoRef });

    useEffect(() => {
        if (isReady && isHovering && !isMobileLayoutActive) {
            setItem(item);
        } else if (isHovering === false && item === activeItem) {
            setItem(undefined);
        }
    }, [isHovering, item, setItem, activeItem, isMobileLayoutActive, isReady]);

    return (
        <div className={clsx(styles.item, styles[`item_${variant}`])}>
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
                        >
                            <MuxPlayer
                                ref={(muxPlayerEl) =>
                                    setVideoRef(muxPlayerEl?.media?.nativeEl)
                                }
                                streamType="on-demand"
                                playbackId={project.data.video}
                                loop
                                muted
                                style={{
                                    aspectRatio,
                                    //@ts-expect-error
                                    "--controls": "none",
                                }}
                                placeholder={blurDataURL}
                                thumbnailTime={
                                    project.data.video_thumbnail_time_bypass ??
                                    0
                                }
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
                        <MuxPlayer
                            key={bypass_video}
                            ref={(muxPlayerEl) =>
                                setVideoRef(muxPlayerEl?.media?.nativeEl)
                            }
                            streamType="on-demand"
                            playbackId={bypass_video}
                            loop
                            muted
                            style={{
                                aspectRatio,
                                //@ts-expect-error
                                "--controls": "none",
                            }}
                            placeholder={blurDataURL}
                            thumbnailTime={
                                item.bypass_video_thumbnail_time ?? 0
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

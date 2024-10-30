"use client";

import { FC, memo, useState } from "react";
import { useEffect } from "react";
import React from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
    muxData?: MuxBlurUpResponse | void;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = memo(
    ({ item, muxData }) => {
        const { project, bypass_video } = item;

        const blurDataURL = muxData?.blurDataURL;
        const aspectRatio = muxData?.aspectRatio;

        const { setItem, item: activeItem, setIsPopupOpen } = useMegaHeroApi();
        const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

        const { isHovering } = useVideoStart({ videoRef });

        useEffect(() => {
            if (isHovering) {
                setItem(item);
            } else if (isHovering === false && item === activeItem) {
                setItem(undefined);
            }
        }, [isHovering, item, setItem, activeItem]);

        return (
            <li className={clsx(styles.item, "carousel_item")}>
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
                            >
                                <MuxPlayer
                                    ref={(muxPlayerEl) =>
                                        setVideoRef(
                                            muxPlayerEl?.media?.nativeEl
                                        )
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
                                        project.data
                                            .video_thumbnail_time_bypass ?? 0
                                    }
                                />
                            </PrismicNextLink>
                        )}
                    {bypass_video && (
                        <div
                            onClick={() => setIsPopupOpen(true)}
                            onKeyDown={() => setIsPopupOpen(true)}
                            aria-label="Showreel"
                            style={{
                                aspectRatio,
                            }}
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
            </li>
        );
    }
);

MegaHeroItemClient.displayName = "MegaHeroItemClient";

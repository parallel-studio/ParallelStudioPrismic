"use client";

import { FC, memo, useState } from "react";
import { useEffect } from "react";
import React from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-item.module.scss";
type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
    muxData: MuxBlurUpResponse;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = memo(
    ({ item, muxData }) => {
        const { project, bypass_video } = item;
        const { blurDataURL, aspectRatio } = muxData;
        const { setItem, item: activeItem } = useMegaHeroApi();
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
                            {/* <MuxPlayer
                                ref={(muxPlayerEl) =>
                                    setVideoRef(muxPlayerEl?.media?.nativeEl)
                                }
                                streamType="on-demand"
                                playbackId={project.data.video}
                                loop
                                muted
                                style={{ aspectRatio }}
                                placeholder={blurDataURL}
                            /> */}
                            {/* <div className={styles.video} ></div> */}
                            <Image
                                className={styles.video}
                                alt=""
                                src={
                                    "https://image.mux.com/DUbH1MIqH3B12W223zun01oA8JoDPt32eVFhP8TbJtSc/thumbnail.png?width=214&height=121&time=8"
                                }
                                width={214}
                                height={121}
                            />
                        </PrismicNextLink>
                    )}
                {bypass_video && (
                    // <MuxPlayer
                    //     key={bypass_video}
                    //     ref={(muxPlayerEl) =>
                    //         setVideoRef(muxPlayerEl?.media?.nativeEl)
                    //     }
                    //     streamType="on-demand"
                    //     playbackId={bypass_video}
                    //     loop
                    //     muted
                    //     style={{ aspectRatio }}
                    //     placeholder={blurDataURL}
                    // />
                    <Image
                        className={styles.video}
                        alt=""
                        src={
                            "https://image.mux.com/DUbH1MIqH3B12W223zun01oA8JoDPt32eVFhP8TbJtSc/thumbnail.png?width=214&height=121&time=8"
                        }
                        width={214}
                        height={121}
                        placeholder={blurDataURL}
                    />
                )}
            </div>
        );
    }
);

MegaHeroItemClient.displayName = "MegaHeroItemClient";

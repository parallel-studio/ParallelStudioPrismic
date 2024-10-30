"use client";
import { FC, useRef, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import css from "styled-jsx/css";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData: MuxBlurUpResponse;
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();
    useVideoStart({ videoRef, containerRef });
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video &&
        muxData
    ) {
        const { video, title, color } = project.data;
        const { blurHashBase64, aspectRatio } = muxData;
        const { className, styles: styleds } = css.resolve`
            div {
                span {
                    color: ${color};
                }
            }
        `;

        return (
            <PrismicNextLink field={project} ref={containerRef} prefetch>
                <div className={styles.video_container}>
                    {video && (
                        <MuxPlayer
                            ref={(muxPlayerEl) =>
                                setVideoRef(muxPlayerEl?.media?.nativeEl)
                            }
                            streamType="on-demand"
                            playbackId={project.data.video}
                            loop
                            muted
                            style={{ aspectRatio }}
                            placeholder={blurHashBase64}
                        />
                    )}
                </div>
                <div className={clsx(styles.info, className)}>
                    <span>{project.data.client.data.name}</span>
                    {` ${title}`}
                    {styleds}
                </div>
            </PrismicNextLink>
        );
    }
};

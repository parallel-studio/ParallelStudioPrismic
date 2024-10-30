"use client";
import { FC, useRef, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasClientData, hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    display?: "horizontal" | "vertical";
};

export const GalleryItem: FC<GalleryItemProps> = ({
    item,
    display = "horizontal",
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();
    const { isHovering } = useVideoStart({ videoRef, containerRef });
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, description, color } = project.data;
        const { className, styles: styleds } = css.resolve`
            div {
                span {
                    color: ${color};
                }
            }
        `;

        return (
            <li className={clsx(styles.item, display)}>
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
                                // style={{ aspectRatio }}
                                // placeholder={blurDataURL}
                            />
                        )}
                    </div>
                    <div className={clsx(styles.info, className)}>
                        <span>{project.data.client.data.name}</span>
                        {` ${title}`}
                        {styleds}
                    </div>
                </PrismicNextLink>
            </li>
        );
    }
};

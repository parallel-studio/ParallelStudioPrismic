"use client";
import { FC, useRef, useState } from "react";

import { BlurUpResult } from "@mux/blurup";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import { hasClientData, hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
import { VideoOnHover, VideoOnHoverProps } from "../video/video-on-hover";
import styles from "./gallery-item.module.scss";

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData: Pick<VideoOnHoverProps, "muxData">;
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, color, client } = project.data;
        const { blurDataURL, aspectRatio } = muxData;

        const projectClient = isFilled.keyText(client.data.name)
            ? client.data.name
            : undefined;
        const projectTitle = isFilled.keyText(title) ? title : undefined;
        const projectColor = isFilled.color(color) ? color : undefined;

        return (
            <PrismicNextLink field={project} ref={containerRef} prefetch>
                <div className={styles.video_container}>
                    {video && (
                        <VideoOnHover
                            playbackId={video}
                            containerRef={containerRef}
                            muxData={muxData}
                        />
                    )}
                </div>
                <Title
                    title={projectClient}
                    description={projectTitle}
                    color={projectColor}
                    className={styles.info}
                />
            </PrismicNextLink>
        );
    }
};

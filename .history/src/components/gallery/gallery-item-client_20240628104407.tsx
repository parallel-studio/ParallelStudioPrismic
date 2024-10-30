"use client";
import { FC, useRef, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
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
    useVideoStart({ videoRef });
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, color } = project.data;
        const { blurDataURL, aspectRatio } = muxData;
        const client = isFilled.keyText(project.data.client.data.name)
            ? project.data.client.data.name
            : undefined;
        const projectTitle = isFilled.keyText(project.data.title)
            ? project.data.title
            : undefined;
        const projectColor = isFilled.color(project.data.color)
            ? project.data.color
            : undefined;
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
                            style={{
                                aspectRatio,
                                //@ts-expect-error
                                "--controls": "none",
                            }}
                            placeholder={blurDataURL}
                        />
                    )}
                </div>
                <div className={clsx(styles.info)}>
                    <span style={{ color: color ?? "inherit" }}>
                        {project.data.client.data.name}
                    </span>
                    {` ${title}`}
                </div>
                <Title
                    title={client}
                    description={projectTitle}
                    color={color}
                />
            </PrismicNextLink>
        );
    }
};

"use client";
import { FC, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
import { VideoOnHover } from "../video/video-on-hover";
import styles from "./gallery-item.module.scss";
import { useLayout } from "@/lib/mobile-layout";

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData: ReturnTypeGetMuxBlurUp;
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { project } = item;
    const { isMobileLayoutActive } = useLayout();

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, color, client } = project.data;

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
                            placeholder={{ fill: true }}
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

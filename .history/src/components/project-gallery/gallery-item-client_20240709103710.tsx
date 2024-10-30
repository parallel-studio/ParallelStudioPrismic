"use client";
import { FC, useCallback, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { colord } from "colord";

import { defaultColor, useTheme } from "@/context/theme";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
import styles from "./gallery-item.module.scss";
import dynamic from "next/dynamic";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false }
);

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData: ReturnTypeGetMuxBlurUp;
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef(null);
    const { project } = item;
    const { setTheme } = useTheme();

    const handleTheme = useCallback(() => {
        if (hasProjectData(project)) {
            const color = project.data.color as string;
            setTheme({ color });
        } else {
            setTheme({ color: defaultColor });
        }
    }, [project, setTheme]);

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, title, color, client } = project.data;

        const projectClient = isFilled.keyText(client.data.name)
            ? client.data.name
            : undefined;
        const projectTitle = isFilled.keyText(title) ? title : undefined;
        const projectColor = isFilled.color(color) ? color : undefined;

        const backgroundColor = projectColor
            ? colord(projectColor).lighten(0.2).toHex()
            : defaultColor;

        return (
            <PrismicNextLink
                field={project}
                onMouseOver={() => handleTheme()}
                prefetch
            >
                <div
                    className={styles.video_container}
                    ref={containerRef}
                    style={{ backgroundColor: projectColor }}
                >
                    {video && (
                        <VideoOnHover
                            playbackId={video}
                            containerRef={containerRef}
                            muxData={muxData}
                            placeholder={{
                                fill: true,
                                backgroundColor: backgroundColor,
                            }}
                        />
                    )}
                </div>
                <div className={styles.info}>
                    <Title
                        title={projectClient}
                        description={projectTitle}
                        color={projectColor}
                    />
                </div>
            </PrismicNextLink>
        );
    }
};

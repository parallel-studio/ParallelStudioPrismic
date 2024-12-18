"use client";
import { FC, useCallback, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { colord } from "colord";
import dynamic from "next/dynamic";

import { defaultColor, useTheme } from "@/context/theme";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
import styles from "./gallery-item.module.scss";
import { useLayout } from "@/lib/mobile-layout";
import { getSmallestAspectRatioVideo } from "@/lib/get-smallest-aspect-ratio";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false }
);

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData_DefaultVideo: ReturnTypeGetMuxBlurUp & { playbackId?: string };
    muxData_AlternativeVideo: ReturnTypeGetMuxBlurUp & { playbackId?: string };
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData_DefaultVideo,
    muxData_AlternativeVideo,
}) => {
    const containerRef = useRef(null);
    const { project } = item;
    const { setTheme } = useTheme();
    const { isMobileLayoutActive } = useLayout();

    const handleTheme = useCallback(() => {
        if (hasProjectData(project)) {
            const color = project.data.color as string;
            setTheme({ color });
        } else {
            setTheme({ color: defaultColor });
        }
    }, [project, setTheme]);

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, video_alternative, title, color, client } = project.data;

        const projectClient = isFilled.keyText(client.data.name)
            ? client.data.name
            : undefined;
        const projectTitle = isFilled.keyText(title) ? title : undefined;
        const projectColor = isFilled.color(color) ? color : undefined;

        const backgroundColor = projectColor
            ? colord(projectColor).lighten(0.2).toHex()
            : defaultColor;

        console.log("DEFAULT_RATIO", muxData_DefaultVideo?.aspectRatio);

        const smallestAspectRatioVideo = getSmallestAspectRatioVideo(
            muxData_DefaultVideo,
            muxData_AlternativeVideo
        );

        const muxVideo = isMobileLayoutActive
            ? smallestAspectRatioVideo
            : muxData_DefaultVideo;

        return (
            <PrismicNextLink
                field={project}
                onMouseOver={() => handleTheme()}
                prefetch
            >
                <div
                    className={styles.video_container}
                    ref={containerRef}
                    style={{
                        backgroundColor: "var(--gray-light-color)",
                        aspectRatio: muxData_DefaultVideo?.aspectRatio,
                    }}
                >
                    {video && (
                        <VideoOnHover
                            playbackId={video}
                            containerRef={containerRef}
                            muxData={muxData_DefaultVideo}
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

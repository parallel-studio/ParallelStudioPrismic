"use client";
import { FC, useCallback, useMemo, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { colord } from "colord";
import dynamic from "next/dynamic";

import { LinkComponent } from "@/components/link/link-component";
import { Title } from "@/components/title/title";
import { useLayout } from "@/context/layout";
import { defaultColor, useTheme } from "@/context/theme";
import { getSmallestAspectRatioVideo } from "@/lib/get-smallest-aspect-ratio";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false }
);

type MuxVideo = ReturnTypeGetMuxBlurUp & {
    playbackId?: string;
    playerInitTime?: number;
};

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData_DefaultVideo?: MuxVideo;

    muxData_AlternativeVideo?: MuxVideo;
};

export const ProjectGalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData_DefaultVideo,
    muxData_AlternativeVideo,
}) => {
    const containerRef = useRef(null);
    const { project, project_video } = item;
    const { setTheme } = useTheme();
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const handleTheme = useCallback(() => {
        if (hasProjectData(project)) {
            const color = project.data.color as string;
            setTheme({ color });
        } else {
            setTheme({ color: defaultColor });
        }
    }, [project, setTheme]);

    const projectData = hasProjectData(project) ? project.data : undefined;

    const title = projectData?.title;
    const color = projectData?.color;
    const client = projectData?.client;

    const clientData = client
        ? hasClientData(client)
            ? client.data
            : undefined
        : undefined;

    const projectClient = clientData
        ? isFilled.keyText(clientData.name)
            ? clientData.name
            : undefined
        : undefined;

    const projectTitle = isFilled.keyText(title) ? title : undefined;
    const projectColor = isFilled.color(color) ? color : undefined;
    const backgroundColor = projectColor
        ? colord(projectColor).lighten(0.2).toHex()
        : defaultColor;

    const smallestAspectRatioVideo = getSmallestAspectRatioVideo(
        muxData_DefaultVideo,
        muxData_AlternativeVideo
    );

    const muxVideo = useMemo(() => {
        return isMobileLayoutActive
            ? smallestAspectRatioVideo
            : project_video === "default"
              ? muxData_DefaultVideo
              : muxData_AlternativeVideo;
    }, [
        isMobileLayoutActive,
        smallestAspectRatioVideo,
        project_video,
        muxData_DefaultVideo,
        muxData_AlternativeVideo,
    ]);

    return (
        <li className={styles.item}>
            <LinkComponent
                field={project}
                onMouseOver={() => handleTheme()}
                prefetch
            >
                <div
                    className={styles.video_container}
                    ref={containerRef}
                    style={{
                        backgroundColor: "var(--theme-placeholder-color)",
                        aspectRatio: muxData_DefaultVideo?.aspectRatio,
                    }}
                >
                    {muxVideo?.playbackId && (
                        <VideoOnHover
                            playbackId={muxVideo.playbackId}
                            containerRef={containerRef}
                            muxData={muxVideo}
                            placeholder={{
                                fill: true,
                                backgroundColor: backgroundColor,
                            }}
                            playerInitTime={muxVideo.playerInitTime}
                        />
                    )}
                </div>
                <div className={styles.info}>
                    <Title
                        title={projectClient}
                        description={projectTitle}
                        color={projectColor}
                        highlight="description"
                    />
                </div>
            </LinkComponent>
        </li>
    );
};

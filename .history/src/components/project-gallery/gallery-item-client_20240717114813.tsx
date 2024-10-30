"use client";
import { FC, useCallback, useMemo, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { colord } from "colord";
import dynamic from "next/dynamic";

import { useLayout } from "@/context/layout";
import { defaultColor, useTheme } from "@/context/theme";
import { getSmallestAspectRatioVideo } from "@/lib/get-smallest-aspect-ratio";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { LinkComponent } from "../link/link-component";
import { Title } from "../title/title";
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

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
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

    if (!hasProjectData(project) || !hasClientData(project.data.client)) { return}
    
    
        const { title, color, client } = project.data;

        const projectClient = isFilled.keyText(client.data.name)
            ? client.data.name
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

        const muxVideo = useMemo(()=>isMobileLayoutActive
        ? smallestAspectRatioVideo
        : project_video === "default"
          ? muxData_DefaultVideo
          : muxData_AlternativeVideo,[]) 

        return (
            <LinkComponent
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
                    />
                </div>
            </LinkComponent>
        );
    }
};

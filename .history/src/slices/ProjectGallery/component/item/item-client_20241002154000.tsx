"use client";
import { FC, useCallback, useMemo, useRef } from "react";

import { isFilled } from "@prismicio/client";
import clsx from "clsx";
import { colord } from "colord";
import dynamic from "next/dynamic";

import { LinkComponent } from "@/components/link/link-component";
import { Title } from "@/components/title/title";
import { useLayout } from "@/context/layout";
import { defaultColor, useTheme } from "@/context/theme";
import { useDim } from "@/hooks/useDim";
import { getSmallestAspectRatioVideo } from "@/lib/get-smallest-aspect-ratio";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";
import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "@/types";

import styles from "../project-gallery.module.scss";

const VideoOnHover = dynamic(
    () =>
        import("@/components/video/video-on-hover").then(
            (mod) => mod.VideoOnHover
        ),
    { ssr: false }
);

type MuxVideo = ReturnTypeGetMuxBlurUp & {
    playbackId?: string;
    playerInitTime?: number;
};

type ProjectGalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData_DefaultVideo?: MuxVideo;
    muxData_AlternateVideo?: MuxVideo;
};

export const ProjectGalleryItemClient: FC<ProjectGalleryItemClientProps> = ({
    item,
    muxData_DefaultVideo,
    muxData_AlternateVideo: muxData_AlternativeVideo,
}) => {
    const linkRef = useRef(null);
    const containerRef = useRef(null);
    const { project, project_video } = item;
    const { setTheme } = useTheme();
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    useDim();

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
                className="dim-cont"
                field={project}
                onMouseOver={() => handleTheme()}
                prefetch
                ref={linkRef}
            >
                <div
                    className={clsx(styles.video_container, "dim-el")}
                    ref={containerRef}
                    style={{
                        backgroundColor: "var(--theme-placeholder-color)",
                        aspectRatio: muxData_DefaultVideo?.aspectRatio,
                    }}
                >
                    {muxVideo && muxVideo?.playbackId && (
                        <VideoOnHover
                            containerRef={containerRef}
                            //being lazy here
                            muxData={muxVideo as any}
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
                        highlight="description"
                    />
                </div>
            </LinkComponent>
        </li>
    );
};

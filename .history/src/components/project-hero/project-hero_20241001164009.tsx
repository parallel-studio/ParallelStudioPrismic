import { FC } from "react";

import { isFilled } from "@prismicio/client";
import clsx from "clsx";

import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectDocument } from "../../../prismicio-types";
import { AngleDown } from "../icons/angle-down";
import { ThemeComponent } from "../theme";
import { Title } from "../title/title";
import { VideoPlayerMux } from "../video/video-player";
import styles from "./project-hero.module.scss";
import { ProjectHeroInfo } from "./project-hero-info";

type ProjectHeroProps = {
    page: ProjectDocument;
};

export const ProjectHero: FC<ProjectHeroProps> = async ({ page }) => {
    const {
        color,
        placeholder_timestamp,
        title,
        description,
        hero_format,
        video_full,
    } = page.data;

    const muxPlaybackId = video_full as string;

    const muxBlur = await getMuxBlurUp({
        muxPlaybackId,
    });

    const projectTitle = isFilled.keyText(title) ? title : undefined;
    const projectDescription = isFilled.keyText(description)
        ? description
        : undefined;
    const projectColor = isFilled.color(color) ? color : undefined;
    const projectFormat = isFilled.keyText(hero_format)
        ? hero_format
        : undefined;
    const aspectRatio = muxBlur?.aspectRatio;

    return (
        <section
            className={clsx(
                styles.wrapper,
                projectFormat ? styles[projectFormat] : undefined
            )}
        >
            {projectColor && <ThemeComponent theme={projectColor} />}
            {muxPlaybackId && (
                <VideoPlayerMux
                    className={styles.hero_video}
                    playbackId={muxPlaybackId}
                    aspectRatio={aspectRatio}
                    thumbnailTime={placeholder_timestamp as number}
                    color={color as string}
                    options={{
                        smallScreenModeContain: true,
                        centerOnPlay: true,
                    }}
                    templateProps={{
                        colors: {
                            backdropColor: aspectRatio
                                ? aspectRatio < 1
                                    ? "white"
                                    : "black"
                                : undefined,
                        },
                    }}
                />
            )}
            {!isFilled.keyText(video_full) && (
                <div
                    className={styles.video_empty_placeholder}
                    style={{ backgroundColor: color ?? "black" }}
                ></div>
            )}
            <div className={styles.info}>
                <div>
                    <Title
                        as="h1"
                        title={projectTitle}
                        description={projectDescription}
                        color={projectColor}
                        className={styles.title}
                        showMore
                    />
                    <ProjectHeroInfo project={page.data} />
                </div>
                <AngleDown />
            </div>
        </section>
    );
};

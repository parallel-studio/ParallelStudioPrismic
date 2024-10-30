import { FC, useState } from "react";

import clsx from "clsx";

import { getMuxBlurUp } from "@/lib/mux-blur";
import { VideoProps } from "@/slices/Video";

import { Section } from "../../components/section/section";
import { VideoPlayerMux } from "../../components/video/video-player";
import styles from "./video-component.module.scss";

export type VideoComponentProps = VideoProps;

export const VideoComponent: FC<VideoComponentProps> = async ({
    slice,
    context,
}) => {
    const muxPlaybackId = slice.primary.playback_id as string;

    const muxBlur = await getMuxBlurUp({
        muxPlaybackId,
    });

    return (
        <Section className={styles.wrapper}>
            <VideoPlayerMux
                className={styles.container}
                playbackId={muxPlaybackId}
                muxBlur={muxBlur}
                smallScreenModeContain
            />
        </Section>
    );
};

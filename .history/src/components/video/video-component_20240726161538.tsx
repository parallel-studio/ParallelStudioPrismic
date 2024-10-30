import { FC, useState } from "react";

import clsx from "clsx";

import { getMuxBlurUp } from "@/lib/mux-blur";
import { VideoProps } from "@/slices/Video";

import { Section } from "../section/section";
import styles from "./video-component.module.scss";
import { VideoPlayerMux } from "./video-player";

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
        <Section>
            <VideoPlayerMux
                className={styles.full_screen_video}
                playbackId={muxPlaybackId}
                muxBlur={muxBlur}
                smallScreenModeContain
            />
        </Section>
    );
};

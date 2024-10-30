import { FC, useState } from "react";

import clsx from "clsx";

import { getMuxBlurUp } from "@/lib/mux-blur";
import { VideoProps } from "@/slices/Video";

import { Section } from "../section/section";
import { VideoPlayerMux } from "./video-player";
import styles from "./video-player.module.scss";

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
                playbackId={muxPlaybackId}
                muxBlur={muxBlur}
                smallScreenModeContain
            />
        </Section>
    );
};

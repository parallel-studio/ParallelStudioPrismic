"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { MuxBlurUpResponse } from "@/lib/mux-blur";

import styles from "./project-hero-video.module.scss";

import "@mux/mux-player/themes/microvideo";

type ProjectHeroVideoProps = {
    playbackId: string;
    muxBlur: MuxBlurUpResponse;
};
export const ProjectHeroVideo: FC<ProjectHeroVideoProps> = ({
    playbackId,
    muxBlur,
}) => {
    return (
        <div className={styles.wrapper}>
        <MuxPlayer
            theme="microvideo"
            streamType="on-demand"
            playbackId={playbackId}
            muted
            style={{ aspectRatio: muxBlur.aspectRatio }}
            placeholder={muxBlur.blurDataURL}
        />
        </div>
    );
};

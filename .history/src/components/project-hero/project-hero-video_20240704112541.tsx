"use client";

import { FC, useState } from "react";

import { BlurUpResult } from "@mux/blurup";
import MuxPlayer from "@mux/mux-player-react/lazy";
import clsx from "clsx";
import css from "styled-jsx/css";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import styles from "./project-hero.module.scss";

type ProjectHeroVideoProps = {
    playbackId: string;
    muxBlur: ReturnTypeGetMuxBlurUp;
    color?: string;
    thumbnailTime?: number;
};
export const ProjectHeroVideo: FC<ProjectHeroVideoProps> = ({
    playbackId,
    muxBlur,
    color,
    thumbnailTime,
}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>();

    const { className, styles: styleds } = css.resolve`
        mux-player::part(bottom time range) {
            --media-range-bar-color: ${color};
        }
    `;

    return (
        <div
            className={clsx(
                styles.video_container,
                className,
                isPlaying ? styles.playing : undefined
            )}
            style={{ aspectRatio: muxBlur.aspectRatio }}
        >
            <MuxPlayer
                key={"project-hero-video"}
                className={clsx(styles.player)}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio: muxBlur.aspectRatio }}
                placeholder={muxBlur.blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                thumbnailTime={thumbnailTime ?? 0}
            />

            {styleds}
        </div>
    );
};

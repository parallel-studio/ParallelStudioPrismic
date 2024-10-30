"use client";

import { FC, use, useEffect, useRef, useState } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import clsx from "clsx";
import { colord } from "colord";
import css from "styled-jsx/css";

import { MuxBlurUpResponse } from "@/lib/mux-blur";

import styles from "./project-hero-video.module.scss";

type ProjectHeroVideoProps = {
    playbackId: string;
    muxBlur: MuxBlurUpResponse;
    color?: string;
};
export const ProjectHeroVideo: FC<ProjectHeroVideoProps> = ({
    playbackId,
    muxBlur,
    color,
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
                styles.wrapper,
                className,
                isPlaying ? styles.playing : undefined
            )}
        >
            <MuxPlayer
                className={clsx(styles.player)}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio: muxBlur.aspectRatio }}
                placeholder={muxBlur.blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {styleds}
        </div>
    );
};

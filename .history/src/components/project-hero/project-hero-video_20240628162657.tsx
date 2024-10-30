"use client";

import { FC, use, useEffect, useRef } from "react";

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
    const videoRef = useRef<any>();
    const { className, styles: styleds } = css.resolve`
        mux-player::part(bottom time range) {
            --media-range-bar-color: ${color};
        }
    `;

    useEffect(() => {
        const muxPlayer = document.querySelector("mux-player");
        console.log("muxPlayer", muxPlayer);
        if (muxPlayer)
            muxPlayer.addEventListener("timeupdate", function (event) {
                console.log("time update!", event);
            });
    }, [videoRef]);

    return (
        <div className={clsx(styles.wrapper, className)}>
            <MuxPlayer
                className={styles.player}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio: muxBlur.aspectRatio }}
                placeholder={muxBlur.blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
                ref={videoRef}
            />
            {styleds}
        </div>
    );
};

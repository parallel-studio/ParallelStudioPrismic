"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { colord } from "colord";

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
    return (
        <div className={styles.wrapper}>
            <MuxPlayer
                streamType="on-demand"
                playbackId={playbackId}
                muted
                style={{ aspectRatio: muxBlur.aspectRatio, blockSize: "50svh" }}
                placeholder={muxBlur.blurDataURL}
                primaryColor={"white"}
                accentColor={
                    color ? colord(color).darken(0.5).toHex() : undefined
                }
            />
        </div>
    );
};
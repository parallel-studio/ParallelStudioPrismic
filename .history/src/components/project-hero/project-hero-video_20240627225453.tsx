"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { MuxBlurUpResponse } from "@/lib/mux-blur";

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
        <MuxPlayer
            theme="microvideo"
            streamType="on-demand"
            playbackId={playbackId}
            muted
            style={{ aspectRatio: muxBlur.aspectRatio }}
            placeholder={muxBlur.blurDataURL}
        />
    );
};

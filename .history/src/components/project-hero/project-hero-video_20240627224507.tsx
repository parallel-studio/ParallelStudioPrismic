"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { MuxBlurUpResponse } from "@/lib/mux-blur";

type ProjectHeroVideoProps = {
    muxBlur: MuxBlurUpResponse;
};
export const ProjectHeroVideo: FC = () => {
    return (
        <MuxPlayer
            streamType="on-demand"
            playbackId={project.data.video}
            muted
            style={{ aspectRatio }}
            placeholder={blurDataURL}
        />
    );
};

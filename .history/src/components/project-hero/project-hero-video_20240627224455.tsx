"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

type ProjectHeroVideoProps = {};
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

"use client";

import { FC, useState } from "react";

import clsx from "clsx";
import Image from "next/image";

import muxLoader from "@/lib/mux-loader";

import { Play } from "../icons/play";
import { Popup } from "../popup/popup";
import { Section } from "../section/section";
import { VideoPlayerMux, VideoPlayerMuxProps } from "./video-player";
import styles from "./video-player.module.scss";

export type VideoComponentProps = {
    video: VideoPlayerMuxProps;
    label: string;
    className?: string;
};

export const VideoComponent: FC<VideoComponentProps> = ({
    video,
    label,
    className,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <Section
            className={clsx(styles.popup_wrapper, className)}
            aria-label={label}
            style={{
                aspectRatio: video.muxBlur?.aspectRatio,
            }}
        >
            <VideoPlayerMux className={styles.full_screen_video} {...video} />
        </Section>
    );
};

"use client";

import { FC, useState } from "react";

import Image from "next/image";

import muxLoader from "@/lib/mux-loader";

import { Play } from "../icons/play";
import { Popup } from "../popup/popup";
import { VideoPlayerMux, VideoPlayerMuxProps } from "../video/video-player";
import styles from "./video-player.module.scss";
import clsx from "clsx";

export type VideoFullScreenProps = {
    video: VideoPlayerMuxProps;
    label: string;
    className?: string;
};

export const VideoFullScreen: FC<VideoFullScreenProps> = ({
    video,
    label,
    className,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div
            className={clsx(styles.popup_wrapper, className)}
            onClick={() => setIsPopupOpen(true)}
            onKeyDown={(e) =>
                e.key === "Enter" ? setIsPopupOpen(true) : undefined
            }
            aria-label={label}
            style={{
                aspectRatio: video.muxBlur?.aspectRatio,
                position: "relative",
            }}
            role="button"
            tabIndex={0}
        >
            <Popup
                setIsOpen={setIsPopupOpen}
                isOpen={isPopupOpen}
                className={styles.popup}
                withCloseButton={false}
            >
                <VideoPlayerMux
                    key={"popup-video"}
                    className={styles.full_screen_video}
                    props={{ autoPlay: "any" }}
                    theme="minimal"
                    variant="playing-cover"
                    {...video}
                />
            </Popup>
            <Image
                className={styles.placeholder_image}
                src={video.playbackId}
                alt=""
                loader={muxLoader}
                placeholder={"blur"}
                blurDataURL={video.muxBlur?.imageDataURL}
                width={1000}
                height={1000}
                style={{ aspectRatio: video.muxBlur?.aspectRatio }}
            />
            <Play className={styles.play} />
        </div>
    );
};

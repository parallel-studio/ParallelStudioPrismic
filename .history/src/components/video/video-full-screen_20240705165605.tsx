"use client";

import { FC, useState } from "react";

import { Popup } from "../popup/popup";
import { VideoPlayerMux, VideoPlayerMuxProps } from "../video/video-player";
import styles from "./mega-hero.module.scss";

type VideoFullScreenProps = {
    video: VideoPlayerMuxProps;
};

export const VideoFullScreen: FC<VideoFullScreenProps> = ({ video }) => {
    const [setIsPopupOpen, isPopupOpen] = useState(false);

    return (
        <div
            onClick={() => setIsPopupOpen(true)}
            onKeyDown={(e) =>
                e.key === "Enter" ? setIsPopupOpen(true) : undefined
            }
            aria-label="Showreel"
            style={{
                aspectRatio,
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
                    playbackId={video?.playbackId}
                    muxBlur={video}
                    className={styles.full_screen_video}
                    props={{ autoPlay: "any" }}
                    theme="minimal"
                    variant="playing-cover"
                />
            </Popup>
        </div>
    );
};

"use client";

import { FC, useEffect, useState } from "react";

import { Popup } from "../popup/popup";
import { VideoPlayerMux } from "../video/video-player";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { prepareVideoData } from "./prepare-video";

type VideoFullScreenProps = {
    video: NonNullable<Awaited<ReturnType<typeof prepareVideoData>>>;
};

export const VideoFullScreen: FC<VideoFullScreenProps> = ({ video }) => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();

    return (
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
    );
};

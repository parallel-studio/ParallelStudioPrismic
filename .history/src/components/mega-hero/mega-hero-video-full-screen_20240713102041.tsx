"use client";

import { FC, useCallback, useRef } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

import { useVideo } from "@/context/video";

import { Popup } from "../popup/popup";
import { VideoPlayerMux } from "../video/video-player";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { prepareVideoData } from "./prepare-video";

type MegaHeroVideoFullScreenProps = {
    video: NonNullable<Awaited<ReturnType<typeof prepareVideoData>>>;
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({
    video,
}) => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    const { startTime, videoId, setStartTime } = useVideo();
    const ref = useRef<MuxPlayerRefAttributes>(null);
    const player = ref.current;

    const handleClose = useCallback(() => {
        console.log(player);
        if (player) {
            console.log(player.currentTime, player);
            setStartTime(player.currentTime);
        }
        setIsPopupOpen(false);
    }, [player, setStartTime, setIsPopupOpen]);

    return (
        <Popup
            key="reel_popup_fullscreen"
            handleClose={handleClose}
            isOpen={isPopupOpen}
            className={styles.popup}
            withCloseButton={false}
        >
            <VideoPlayerMux
                ref={ref}
                key={"popup-video"}
                playbackId={video?.playbackId}
                muxBlur={video}
                className={styles.full_screen_video}
                props={{
                    autoPlay: "any",
                    startTime: videoId === video?.playbackId ? startTime : 0,
                }}
                theme="minimal"
                variant="playing-cover"
            />
        </Popup>
    );
};

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
    playerInitTime?: number;
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({
    video,
    playerInitTime = 0,
}) => {
    const ref = useRef<MuxPlayerRefAttributes>(null);
    const { setIsPopupOpen, isPopupOpen, setItem } = useMegaHeroApi();
    const { setStartTime } = useVideo();
    const handleClose = useCallback(() => {
        if (ref.current) {
            setStartTime(ref.current.currentTime);
        }
        setIsPopupOpen(false);
        setItem(undefined);
    }, [ref, setStartTime, setIsPopupOpen, setItem]);

    return (
        <Popup
            key="reel_popup_fullscreen"
            handleClose={handleClose}
            isOpen={isPopupOpen}
            withCloseButton={false}
        >
            <VideoPlayerMux
                key={"popup-video"}
                playbackId={video?.playbackId}
                muxBlur={video}
                className={styles.full_screen_video}
                props={{
                    autoPlay: "any",
                    startTime: playerInitTime,
                }}
                placeHolderOn={false}
            />
        </Popup>
    );
};

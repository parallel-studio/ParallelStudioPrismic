"use client";

import { FC, useEffect, useState } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { Popup } from "../popup/popup";
import { VideoPlayerMux } from "../video/video-player";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
type MegaHeroVideoFullScreenProps = {
    playbackId: string;
    muxblur?: ReturnTypeGetMuxBlurUp;
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({
    playbackId,
}) => {
    const [isReady, setIsReady] = useState(false);
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 20000);
    }, []);
    return (
        <Popup
            setIsOpen={setIsPopupOpen}
            isOpen={isPopupOpen}
            className={styles.popup}
            withCloseButton={false}
        >
            <VideoPlayerMux
                key={"popup-video"}
                playbackId={playbackId}
                thumbnailTime={thumbnailTime}
            />
        </Popup>
    );
};

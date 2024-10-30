"use client";

import { FC, useEffect, useState } from "react";

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
    muxblur,
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
                muxBlur={muxblur}
            />
        </Popup>
    );
};

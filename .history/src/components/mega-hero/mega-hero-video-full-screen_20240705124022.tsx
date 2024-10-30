"use client";

import { FC, useEffect, useState } from "react";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { Popup } from "../popup/popup";
import { VideoPlayerMux } from "../video/video-player";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { prepareVideoData } from "./prepare-video";

type MegaHeroVideoFullScreenProps = {
    video: Awaited<ReturnType<typeof prepareVideoData>>;
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({
    video,
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
                playbackId={video.bypass_video}
                muxBlur={muxblur}
            />
        </Popup>
    );
};
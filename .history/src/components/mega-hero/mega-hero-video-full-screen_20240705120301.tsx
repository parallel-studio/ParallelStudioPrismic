"use client";

import { FC, useState } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
type MegaHeroVideoFullScreenProps = {
    playbackId: string;
    aspectRatio?: number;
    blurDataURL?: string;
    thumbnailTime?: number;
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({
    playbackId,
    aspectRatio,
    blurDataURL,
    thumbnailTime,
}) => {
    const [isReady, setIsReady] = useState(false);
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup
            setIsOpen={setIsPopupOpen}
            isOpen={isPopupOpen}
            className={styles.popup}
            withCloseButton={false}
        >
            <MuxPlayer
                className={styles.full_screen_video}
                key={"popup-video"}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio, display: isReady ? "block" : "none" }}
                placeholder={blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
                thumbnailTime={thumbnailTime}
                autoPlay
                onPlay={() => setIsReady(true)}
            />
        </Popup>
    );
};

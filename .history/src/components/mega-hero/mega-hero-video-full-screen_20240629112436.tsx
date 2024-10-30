"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context";

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
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup setIsOpen={setIsPopupOpen} isOpen={isPopupOpen}>
            <MuxPlayer
                key={"popup-video"}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio }}
                placeholder={blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
                thumbnailTime={thumbnailTime}
            />
        </Popup>
    );
};

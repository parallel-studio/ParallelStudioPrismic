"use client";

import { FC } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context-hero";

type MegaHeroVideoFullScreenProps = {
    playbackId: string;
    muxBlur: { aspectRatio: number; blurDataURL: string };
};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = ({playbackId, muxBlur}) => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup setIsOpen={setIsPopupOpen} isOpen={isPopupOpen}>
            <MuxPlayer
                key={"popup-video"}
                streamType="on-demand"
                playbackId={playbackId}
                style={{ aspectRatio: muxBlur.aspectRatio }}
                placeholder={muxBlur.blurDataURL}
                primaryColor={"white"}
                accentColor={"black"}
            />
        </Popup>
    );
};
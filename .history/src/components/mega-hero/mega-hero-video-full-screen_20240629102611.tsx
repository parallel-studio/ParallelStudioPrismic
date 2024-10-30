"use client";

import { FC } from "react";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context-hero";
import MuxPlayer from "@mux/mux-player-react/lazy";

type MegaHeroVideoFullScreenProps = {};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = () => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup setIsOpen={setIsPopupOpen} isOpen={isPopupOpen}>
            <MuxPlayer
                key={"popup-video"}
                streamType="on-demand"
                playbackId={bypass_video}
                loop
                muted
                style={{
                    aspectRatio,
                    //@ts-expect-error
                    "--controls": "none",
                }}
                placeholder={blurDataURL}
            />{" "}
        </Popup>
    );
};

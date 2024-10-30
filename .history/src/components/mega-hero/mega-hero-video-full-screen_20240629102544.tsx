"use client";

import { FC } from "react";

import { Popup } from "../popup/popup";
import { useMegaHeroApi } from "./context-hero";

type MegaHeroVideoFullScreenProps = {};

export const MegaHeroVideoFullScreen: FC<MegaHeroVideoFullScreenProps> = () => {
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();
    return (
        <Popup setIsOpen={setIsPopupOpen} isOpen={isPopupOpen}>
            <MuxPlayer
                key={bypass_video}
                ref={(muxPlayerEl) => setVideoRef(muxPlayerEl?.media?.nativeEl)}
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

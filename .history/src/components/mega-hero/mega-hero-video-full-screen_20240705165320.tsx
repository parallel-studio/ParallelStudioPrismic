"use client";

import { FC, useEffect, useState } from "react";

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
    const [isReady, setIsReady] = useState(false);
    const { setIsPopupOpen, isPopupOpen } = useMegaHeroApi();

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 20000);
    }, []);
    return (
        <div
            onClick={() => setIsPopupOpen(true)}
            onKeyDown={(e) =>
                e.key === "Enter" ? setIsPopupOpen(true) : undefined
            }
            aria-label="Showreel"
            style={{
                aspectRatio,
            }}
            role="button"
            tabIndex={0}
        >
            <Popup
                setIsOpen={setIsPopupOpen}
                isOpen={isPopupOpen}
                className={styles.popup}
                withCloseButton={false}
            >
                <VideoPlayerMux
                    key={"popup-video"}
                    playbackId={video?.playbackId}
                    muxBlur={video}
                    className={styles.full_screen_video}
                    props={{ autoPlay: "any" }}
                    theme="minimal"
                    variant="playing-cover"
                />
            </Popup>
            <VideoOnHover
                playbackId={bypass_video}
                muxData={muxData}
                containerRef={containerRef}
            />
        </div>
    );
};

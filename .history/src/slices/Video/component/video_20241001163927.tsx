import { FC } from "react";

import { getMuxBlurUp } from "@/lib/mux-blur";
import { VideoProps } from "@/slices/Video";

import { Section } from "../../components/section/section";
import { VideoPlayerMux } from "../../components/video/video-player";
import styles from "./video.module.scss";

export type VideoComponentProps = VideoProps;

export const Video: FC<VideoComponentProps> = async ({ slice, context }) => {
    const muxPlaybackId = slice.primary.playback_id as string;
    const thumbnailTime = slice.primary.placeholder_timestamp;

    const muxBlur = await getMuxBlurUp({
        muxPlaybackId,
    });

    const aspectRatio = muxBlur?.aspectRatio;

    return (
        <Section>
            <VideoPlayerMux
                className={styles.container}
                playbackId={muxPlaybackId}
                aspectRatio={aspectRatio}
                thumbnailTime={thumbnailTime as number}
                options={{ smallScreenModeContain: true }}
                templateProps={{
                    colors: {
                        backdropColor: aspectRatio
                            ? aspectRatio < 1
                                ? "white"
                                : "black"
                            : undefined,
                    },
                }}
            />
        </Section>
    );
};

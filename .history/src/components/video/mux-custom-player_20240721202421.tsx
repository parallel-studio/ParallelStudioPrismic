"use client";

import { FC, forwardRef, HTMLAttributes } from "react";

import MuxVideo from "@mux/mux-video-react";
import {
    MediaControlBar,
    MediaController,
    MediaMuteButton,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaTimeDisplay,
    MediaTimeRange,
    MediaVolumeRange,
} from "media-chrome/react";

type MuxCustomPlayerProps = {} & HTMLAttributes<HTMLVideoElement>;

export const MuxCustomPlayer = forwardRef<
    HTMLVideoElement,
    MuxCustomPlayerProps
>((props, ref) => {
    return (
        <MediaController>
            <MuxVideo slot="media" muted {...props} ref={ref} />
            <MediaControlBar>
                <MediaPlayButton></MediaPlayButton>
                <MediaSeekBackwardButton></MediaSeekBackwardButton>
                <MediaSeekForwardButton></MediaSeekForwardButton>
                <MediaTimeRange></MediaTimeRange>
                <MediaTimeDisplay showDuration></MediaTimeDisplay>
                <MediaMuteButton></MediaMuteButton>
                <MediaVolumeRange></MediaVolumeRange>
            </MediaControlBar>
        </MediaController>
    );
});

MuxCustomPlayer.displayName = "MuxCustomPlayer";

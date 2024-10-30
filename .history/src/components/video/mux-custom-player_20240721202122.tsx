"use client";

import { FC, HTMLAttributes } from "react";

import { MuxPlayerProps } from "@mux/mux-player-react";
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

export const MuxCustomPlayer: FC<MuxCustomPlayerProps> = (props) => {
    return (
        <MediaController>
            <MuxVideo slot="media" muted {...props} />
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
};

export default SimplePlayer;

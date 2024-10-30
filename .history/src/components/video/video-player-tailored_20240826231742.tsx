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

export const SimplePlayer = () => {
    return (
        <MediaController>
            <video
                slot="media"
                src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
                preload="auto"
                muted
                crossOrigin=""
            />
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

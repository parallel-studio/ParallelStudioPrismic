"use client";
import { useState } from "react";

import { MediaThemeElement } from "media-chrome/dist/media-theme-element.js";
import {
    MediaAirplayButton,
    MediaCaptionsButton,
    MediaControlBar,
    MediaController,
    MediaFullscreenButton,
    MediaLoadingIndicator,
    MediaMuteButton,
    MediaPipButton,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaPosterImage,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaTimeDisplay,
    MediaTimeRange,
    MediaVolumeRange,
} from "media-chrome/react";
import {
    MediaPlaybackRateMenu,
    MediaPlaybackRateMenuButton,
} from "media-chrome/react/menu";

const chromeStyles = {
    "--media-primary-color": "white",
};

const toggleBool = (prev: boolean | undefined) => !prev;

export const SimplePlayer = () => {
    const [mounted, setMounted] = useState<boolean>(true);
    const [noDefaultStore, setNoDefaultStore] = useState(false);
    return (
        <>
            {mounted && (
                <MediaController
                    style={chromeStyles}
                    defaultSubtitles
                    noDefaultStore={noDefaultStore}
                >
                    <media-theme></media-theme>
                    <video
                        suppressHydrationWarning
                        slot="media"
                        src="https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/high.mp4"
                        preload="auto"
                        muted
                        crossOrigin=""
                    >
                        <track
                            label="thumbnails"
                            default
                            kind="metadata"
                            src="https://image.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/storyboard.vtt"
                        />
                        <track
                            label="English"
                            kind="captions"
                            srcLang="en"
                            src="./vtt/en-cc.vtt"
                        />
                    </video>

                    <MediaPosterImage
                        slot="poster"
                        src="https://image.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg/thumbnail.jpg"
                        placeholderSrc="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUADADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECBAP/xAAdEAEBAAEEAwAAAAAAAAAAAAAAARECAxITFCFR/8QAGQEAAwADAAAAAAAAAAAAAAAAAAEDAgQF/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAETERL/2gAMAwEAAhEDEQA/ANeC4ldyI1b2EtIzzrrIqYZLvl5FGkGdbfQzGPvo76WsPxXLlfqbaA5va2iVJADgPELACsD/2Q=="
                    ></MediaPosterImage>
                    <MediaLoadingIndicator
                        suppressHydrationWarning
                        noautohide
                        slot="centered-chrome"
                        style={{
                            "--media-loading-indicator-icon-height": "200px",
                        }}
                    ></MediaLoadingIndicator>
                    <MediaPlaybackRateMenu hidden anchor="auto" />
                    <MediaControlBar>
                        <MediaPlayButton></MediaPlayButton>
                        <MediaSeekBackwardButton
                            seekOffset={10}
                        ></MediaSeekBackwardButton>
                        <MediaSeekForwardButton
                            seekOffset={10}
                        ></MediaSeekForwardButton>
                        <MediaTimeRange></MediaTimeRange>
                        <MediaTimeDisplay showDuration></MediaTimeDisplay>
                        <MediaMuteButton></MediaMuteButton>
                        <MediaVolumeRange></MediaVolumeRange>
                        <MediaPlaybackRateButton></MediaPlaybackRateButton>
                        <MediaPlaybackRateMenuButton></MediaPlaybackRateMenuButton>
                        <MediaCaptionsButton></MediaCaptionsButton>
                        <MediaAirplayButton></MediaAirplayButton>
                        <MediaPipButton></MediaPipButton>
                        <MediaFullscreenButton></MediaFullscreenButton>
                    </MediaControlBar>
                </MediaController>
            )}
        </>
    );
};

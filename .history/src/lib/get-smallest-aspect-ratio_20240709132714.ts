import { ReturnTypeGetMuxBlurUp } from "./mux-blur";

type Props = ReturnTypeGetMuxBlurUp & { playbackId?: string };

export const getSmallestAspectRatioVideo = (
    defaultVideo?: Props,
    alternativeVideo?: Props
) => {
    if (defaultVideo && alternativeVideo) {
        return defaultVideo.aspectRatio < alternativeVideo.aspectRatio
            ? defaultVideo
            : alternativeVideo;
    }
    return defaultVideo || alternativeVideo;
};

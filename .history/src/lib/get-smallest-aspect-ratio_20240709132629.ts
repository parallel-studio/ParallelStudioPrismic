import { ReturnTypeGetMuxBlurUp } from "./mux-blur";

type Props = ReturnTypeGetMuxBlurUp & { playbackID?: string };

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

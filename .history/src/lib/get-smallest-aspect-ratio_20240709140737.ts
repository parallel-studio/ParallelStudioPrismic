import { ReturnTypeGetMuxBlurUp } from "./mux-blur";

type Props = { aspectRatio?: number };

export const getSmallestAspectRatioVideo = (
    defaultVideo?: Props,
    alternativeVideo?: Props
) => {
    if (defaultVideo?.aspectRatio && alternativeVideo?.aspectRatio) {
        return defaultVideo.aspectRatio <= alternativeVideo.aspectRatio
            ? defaultVideo
            : alternativeVideo;
    }
    {
        return defaultVideo || alternativeVideo;
    }
};

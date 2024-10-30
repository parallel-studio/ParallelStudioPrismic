import { ReturnTypeGetMuxBlurUp } from "./mux-blur";

type Props = ReturnTypeGetMuxBlurUp & { playbackID?: string };

export const getSmallestAspectRatioVideo = (
    muxData_DefaultVideo?: Props,
    muxData_AlternativeVideo?: Props
) => {
    if (muxData_DefaultVideo && muxData_AlternativeVideo) {
        return muxData_DefaultVideo.aspectRatio <
            muxData_AlternativeVideo.aspectRatio
            ? muxData_DefaultVideo
            : muxData_AlternativeVideo;
    }
    return muxData_DefaultVideo || muxData_AlternativeVideo;
};

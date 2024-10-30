const getSmallestAspectRatioVideo = (
    muxData_DefaultVideo: ReturnTypeGetMuxBlurUp | undefined,
    muxData_AlternativeVideo: ReturnTypeGetMuxBlurUp | undefined
) => {
    if (muxData_DefaultVideo && muxData_AlternativeVideo) {
        return muxData_DefaultVideo.aspectRatio <
            muxData_AlternativeVideo.aspectRatio
            ? muxData_DefaultVideo
            : muxData_AlternativeVideo;
    }
    return muxData_DefaultVideo || muxData_AlternativeVideo;
};

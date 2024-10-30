type Props = { aspectRatio?: number };

export function getSmallestAspectRatioVideo<T extends Props>(
    defaultVideo?: T,
    alternativeVideo?: T
) {
    console.log(defaultVideo, alternativeVideo);
    console.log(defaultVideo.aspectRatio < alternativeVideo.aspectRatio);
    if (defaultVideo?.aspectRatio && alternativeVideo?.aspectRatio) {
        return defaultVideo.aspectRatio < alternativeVideo.aspectRatio
            ? defaultVideo
            : alternativeVideo;
    }

    return defaultVideo || alternativeVideo;
}

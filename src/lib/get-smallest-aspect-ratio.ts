type Props = { aspectRatio?: number };

export function getSmallestAspectRatioVideo<T extends Props>(
  defaultVideo?: T,
  alternativeVideo?: T,
) {
  if (defaultVideo?.aspectRatio && alternativeVideo?.aspectRatio) {
    return defaultVideo.aspectRatio <= alternativeVideo.aspectRatio
      ? defaultVideo
      : alternativeVideo;
  }
}

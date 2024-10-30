import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import VideoComponent from "./component";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = (props: VideoProps): JSX.Element => {
  return <VideoComponent {...props} />;
};

export default Video;

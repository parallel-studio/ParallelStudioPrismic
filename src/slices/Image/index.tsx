import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { ImageSlice } from "../../../prismicio-types";
import ImageComponent from "./component";

export type ImageProps = SliceComponentProps<ImageSlice>;

const Image: FC<ImageProps> = (props) => {
  return <ImageComponent {...props} />;
};

export default Image;

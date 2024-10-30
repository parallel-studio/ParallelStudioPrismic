import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { ImageSlice } from "../../../prismicio-types";
import ImageBlock from "./component";

export type ImageProps = SliceComponentProps<ImageSlice>;

const Image: FC<ImageProps> = (props) => {
    return <ImageBlock {...props} />;
};

export default Image;

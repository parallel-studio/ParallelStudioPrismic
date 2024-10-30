import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { TextWithImageSlice } from "../../../prismicio-types";
import TextComponent from "./component";

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

const TextWithImage: FC<TextWithImageProps> = (props) => {
    return <TextComponent {...props} />;
};

export default TextWithImage;

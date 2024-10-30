import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { TextWithImageSlice } from "../../../prismicio-types";

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

const TextWithImage: FC<TextWithImageProps> = (props) => {
    return <TextWithImage {...props} />;
};

export default TextWithImage;

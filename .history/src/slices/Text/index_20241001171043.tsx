import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import TextComponent from "@/slices/Text/text";

import { TextWithImageSlice } from "../../../prismicio-types";

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

const TextWithImage: FC<TextWithImageProps> = (props) => {
    return <TextComponent {...props} />;
};

export default TextWithImage;

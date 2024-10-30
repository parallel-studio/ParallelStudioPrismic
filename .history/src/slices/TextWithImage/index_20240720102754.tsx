import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { TextWithImageComponent } from "@/components/text-with-image/text-with-image";

import { TextWithImageSlice } from "../../../prismicio-types";

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

const TextWithImage: FC<TextWithImageProps> = (props) => {
    return <TextWithImageComponent {...props} />;
};

export default TextWithImage;

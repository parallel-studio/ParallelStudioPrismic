import { FC } from "react";

import { PrismicNextImage } from "@prismicio/next";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextComponent } from "@/components/text/text";
import {
    TextWithImageComponent,
    TextWithImageVariants,
} from "@/components/text-with-image/text-with-image";

import { TextWithImageSlice } from "../../../prismicio-types";

type Variations = TextWithImageProps["slice"]["variation"];

const VARIANT_MAP: Record<Variations, TextWithImageVariants> = {
    image_left: "image_left",
    default: "image_right",
    image_left_compact: "image_left_compact",
    image_right_compact: "image_right_compact",
};

type TextWithImageProps = {
    slice: TextWithImageSlice;
};

const TextWithImage: FC<TextWithImageProps> = ({ slice }) => {
    const image = slice.primary.image;

    return (
        <Section>
            <TextWithImageComponent>
                <TextComponent>
                    <PrismicRichText field={slice.primary.text} />
                </TextComponent>
                <PrismicNextImage field={image} />
            </TextWithImageComponent>
        </Section>
    );
};

export default TextWithImage;

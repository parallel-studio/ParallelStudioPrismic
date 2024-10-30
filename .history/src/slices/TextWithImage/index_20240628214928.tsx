import { FC } from "react";

import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextComponent } from "@/components/text/text";

import { TextWithImageSlice } from "../../../prismicio-types";
import { Gallery } from "@/components/gallery/gallery";
type TextWithImageProps = {
    slice: TextWithImageSlice;
};

const TextWithImage: FC<TextWithImageProps> = ({ slice }) => {
    const image = slice.primary.image;

    return (
        <Section>
            <Gallery>
                <TextComponent>
                    <PrismicRichText field={slice.primary.text} />
                </TextComponent>
            </Gallery>
        </Section>
    );
};

export default TextWithImage;

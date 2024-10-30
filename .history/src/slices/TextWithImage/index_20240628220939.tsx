import { FC } from "react";

import { PrismicNextImage } from "@prismicio/next";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextComponent } from "@/components/text/text";
import { TextWithImageComponent } from "@/components/text-with-image/text-with-image";

import { TextWithImageSlice } from "../../../prismicio-types";
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
                <PrismicNextImage
                    field={image}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </TextWithImageComponent>
        </Section>
    );
};

export default TextWithImage;

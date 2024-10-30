import { FC } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextComponent } from "@/components/text/text";
import {
    TextWithImageComponent,
    TextWithImageVariants,
} from "@/components/text-with-image/text-with-image";

import { TextWithImageSlice } from "../../../prismicio-types";

const ImageComponent = dynamic(() =>
    import("@/components/image/image").then((mod) => mod.ImageComponent)
);

type Variations = TextWithImageProps["slice"]["variation"];

const VARIANT_MAP: Record<Variations, TextWithImageVariants> = {
    default: "image_right",
    imageLeftTextRight: "image_left",
    textLargeImageSmall: "image_right_compact",
    imageSmallTextLarge: "image_left_compact",
};

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

const TextWithImage: FC<TextWithImageProps> = ({ slice, context }) => {
    const image = slice.primary.image;
    const { clientOnly } = context as any;

    return (
        <Section>
            <TextWithImageComponent variant={VARIANT_MAP[slice.variation]}>
                <TextComponent variant="hero">
                    <PrismicRichText field={slice.primary.text} />
                </TextComponent>
                {!clientOnly && <ImageComponent image={image} />}
                {clientOnly && (
                    <PrismicNextImage field={image} fallbackAlt="" />
                )}
            </TextWithImageComponent>
        </Section>
    );
};

export default TextWithImage;

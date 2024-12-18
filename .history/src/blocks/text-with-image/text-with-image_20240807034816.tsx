import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { Gallery } from "@/components/gallery/gallery";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";

import { TextWithImageSlice } from "../../../prismicio-types";
import { TextWrapper } from "../text/text-wrapper";
import styles from "./text-with-image.module.scss";

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

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

const getBlockStyle = ({
    blockSizeType,
    fixedHeightValue = 300,
}: {
    blockSizeType?: TextWithImageProps["slice"]["primary"]["height_variant"];
    fixedHeightValue?: number;
}) => {
    switch (blockSizeType) {
        case "fixed":
            return "fixed";
            break;
        case "auto":
            return `100%`;
            break;
        case "double":
            return `calc(2 * var(--block-height-base))`;
        default:
            return `var(--block-height-base)`;
            break;
    }
};

export const TextWithImage: FC<TextWithImageProps> = ({ slice, context }) => {
    const image = slice.primary.image;
    const { clientOnly, loadingColor: color } = context as any;
    const heightVariant = slice.primary?.height_variant ?? "default";
    const height =
        heightVariant === "fixed" ? slice.primary?.height ?? 300 : undefined;
    const layoutType = slice.primary?.height_variant;

    return (
        <Gallery
            as={"div"}
            gap="small"
            layoutType="default"
            fixedHeightValue={height}
            blockSizeType="double"
        >
            <TextWrapper blockSize={height}>
                <PrismicRichText field={slice.primary.text} />
            </TextWrapper>
            {!clientOnly && (
                <ImageComponent
                    className={styles.image}
                    field={image}
                    loadingProps={{ style: { backgroundColor: color } }}
                />
            )}
            {clientOnly && (
                <PrismicNextImage
                    className={styles.image}
                    field={image}
                    fallbackAlt=""
                />
            )}
        </Gallery>
    );
};

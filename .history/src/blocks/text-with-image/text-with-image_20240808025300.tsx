import { FC } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

import { Gallery } from "@/components/gallery/gallery";
import { PrismicRichText } from "@/components/PrismicRichText";

import { TextWithImageSlice } from "../../../prismicio-types";
import { TextWrapper } from "../text/text-wrapper";
import styles from "./text-with-image.module.scss";

const ImageComponent = dynamic(() =>
    import("@/components/image/image").then((mod) => mod.ImageComponent)
);

type TextWithImageProps = SliceComponentProps<TextWithImageSlice>;

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

const DEFAULT_HEIGHT = 300;

export const TextWithImage: FC<TextWithImageProps> = ({ slice, context }) => {
    const image = slice.primary.image;
    const { clientOnly, loadingColor: color } = context as any;
    const heightVariant = slice.primary?.height_variant ?? "default";
    const height =
        heightVariant === "fixed"
            ? slice.primary?.height ?? DEFAULT_HEIGHT
            : undefined;
    const blockSizeType = slice.primary?.height_variant;

    return (
        <Gallery
            as={"div"}
            gap="small"
            layoutType="default"
            fixedHeightValue={height}
            blockSizeType={blockSizeType}
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

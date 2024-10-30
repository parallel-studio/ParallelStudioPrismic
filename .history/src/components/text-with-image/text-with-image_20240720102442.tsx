import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextWrapper } from "@/components/text/text";
import {
    TextWithImageVariants,
    TextWithImageWrapper,
} from "@/components/text-with-image/text-with-image";

import { TextWithImageSlice } from "../../../prismicio-types";
import styles from "./text-with-image.module.scss";

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

type TextWithImageProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    variant?: TextWithImageVariants;
    heightVariant?: "default" | "fixed" | "auto";
} & HTMLAttributes<T>;

export const TextWithImageWrapper: FC<TextWithImageProps<ElementType>> = ({
    children,
    as: Tag = "div",
    variant = "image_right",
    heightVariant = "default",
    ...etc
}) => {
    const { className, ...rest } = etc;
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[variant],
                styles[heightVariant],
                className
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
};

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
    const heightVariant = slice.primary?.height_variant ?? "default";
    const height =
        heightVariant === "fixed" ? slice.primary?.height ?? 300 : undefined;

    return (
        <Section>
            <TextWithImageWrapper
                variant={VARIANT_MAP[slice.variation]}
                heightVariant={heightVariant}
            >
                <TextWrapper variant="hero" style={{ minBlockSize: height }}>
                    <PrismicRichText field={slice.primary.text} />
                </TextWrapper>
                {!clientOnly && <ImageComponent image={image} />}
                {clientOnly && (
                    <PrismicNextImage field={image} fallbackAlt="" />
                )}
            </TextWithImageWrapper>
        </Section>
    );
};

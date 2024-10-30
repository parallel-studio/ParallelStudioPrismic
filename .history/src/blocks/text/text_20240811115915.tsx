import { FC } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";

import { TextWithImageSlice } from "../../../prismicio-types";
import { TextContainer } from "../../components/text-container/text-container";
import styles from "./text.module.scss";

const ImageComponent = dynamic(() =>
    import("@/components/image/image").then((mod) => mod.ImageComponent)
);

type TextProps = SliceComponentProps<TextWithImageSlice>;

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

const getLayout = (
    variation: TextProps["slice"]["variation"]
): GalleryClassNames => {
    switch (variation) {
        case "textLargeImageSmall":
            return "three_to_one";
            break;
        case "imageSmallTextLarge":
            return "one_to_three";
            break;
        default:
            return "default";
            break;
    }
};

const DEFAULT_HEIGHT = 300;

const megaFullScreenComponents: JSXMapSerializer = {
    hyperlink: ({ node, children }) => {
        return (
            <LinkArrow link={node.data} variant="go_to" size="small">
                {children}
            </LinkArrow>
        );
    },
};

export const Text: FC<TextProps> = ({ slice, context }) => {
    const image = slice.primary?.image;
    const variation = slice.variation;
    const { clientOnly, loadingColor: color } = context as any;
    const blockSizeType = slice.primary?.height_variant ?? "default";
    const height =
        blockSizeType === "fixed"
            ? slice.primary?.height ?? DEFAULT_HEIGHT
            : undefined;

    const Image =
        !clientOnly && image ? (
            <ImageComponent className={styles.image} field={image} />
        ) : image ? (
            <PrismicNextImage
                className={styles.image}
                field={image}
                fallbackAlt=""
            />
        ) : undefined;

    const getChildren = (): JSX.Element => {
        switch (variation) {
            case "textLargeImageSmall":
            case "textLeftImageRight":
                return (
                    <>
                        <TextContainer>
                            <PrismicRichText
                                field={slice.primary.text}
                                components={megaFullScreenComponents}
                            />
                        </TextContainer>
                        {Image}
                    </>
                );
                break;
            case "imageLeftTextRight":
            case "imageSmallTextLarge":
                return (
                    <>
                        {Image}
                        <TextContainer>
                            <PrismicRichText
                                field={slice.primary.text}
                                components={megaFullScreenComponents}
                            />
                        </TextContainer>
                    </>
                );
                break;
            default:
                return (
                    <TextContainer>
                        <PrismicRichText
                            field={slice.primary.text}
                            components={megaFullScreenComponents}
                        />
                    </TextContainer>
                );
                break;
        }
    };

    return (
        <Gallery
            as={"div"}
            gap="small"
            layoutType={getLayout(variation)}
            fixedHeightValue={height}
            blockSizeType={blockSizeType}
        >
            {getChildren()}
        </Gallery>
    );
};

import { CSSProperties, FC, Fragment } from "react";

import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { ImageProps } from "@/slices/Image";

import { ImageSliceVariation } from "../../../prismicio-types";
import styles from "./image.module.scss";

const ImageComponent = dynamic(() =>
    import("@/components/image/image").then((mod) => mod.ImageComponent)
);

type ImageVariantsProps = Record<
    ImageSliceVariation["variation"],
    { items: number; className: GalleryClassNames }
>;

const imageVariants: ImageVariantsProps = {
    default: { items: Infinity, className: "default" },
    bannerSmallXBigXSmall: { items: 3, className: "small_big_small" },
    bannerBigXSmall: { items: 2, className: "three_to_one" },
    bannerSmallXBig: { items: 2, className: "one_to_three" },
    bannerAutoGrid: { items: Infinity, className: "bannerAutoGrid" },
    smart: { items: Infinity, className: "smart" },
};

const getSmartItems = (itemsProps: ImageField[]) => {
    const width = itemsProps.reduce(
        (acc, item) => acc + (item?.dimensions?.width ?? 0),
        0
    );

    const height = itemsProps.find((item) =>
        Math.max(item.dimensions?.height ?? 0)
    ).dimensions?.height;

    const items = itemsProps
        ?.map((item) => {
            return item.dimensions;
        })
        .filter((item) => item !== undefined && item !== null);
    return { width, items };
};

export const Image: FC<ImageProps> = ({ slice, context }) => {
    const color = (context as any)?.loadingColor;
    const { clientOnly } = context as any;

    const items =
        slice.variation !== "default" ? slice.primary?.images : undefined;
    const variation = slice.variation;
    const blockSizeType =
        variation === "smart" ? "auto" : slice.primary?.height_variant;
    const height = (slice.primary as any).height as number;
    const inlineSizeType =
        variation === "default"
            ? slice.primary.width_variant
            : variation === "smart"
              ? "auto"
              : undefined;
    const loadingProps = {
        className: styles.gallery_image,
        style: {
            backgroundColor: color,
            objectFit: "cover" as CSSProperties["objectFit"],
            width: "100%",
            height: "100%",
        },
    };

    const smartItems = items
        ?.map((item) => {
            return item.image.dimensions;
        })
        .filter((item) => item !== undefined && item !== null);

    return (
        <Gallery
            layoutType={imageVariants[variation]?.className}
            as={"div"}
            gap="small"
            blockSizeType={blockSizeType}
            inlineSizeType={inlineSizeType}
            fixedHeightValue={height}
            smartImages={smartItems}
        >
            {slice.variation !== "default" &&
                items?.slice(0, imageVariants[variation].items)?.map((item) => {
                    if (isFilled.image(item.image)) {
                        return (
                            <Fragment key={`${slice.id}__${item.image.id}`}>
                                {!clientOnly && (
                                    <ImageComponent
                                        field={item.image}
                                        loadingProps={loadingProps}
                                    />
                                )}
                                {clientOnly && (
                                    <PrismicNextImage
                                        field={item.image}
                                        fallbackAlt=""
                                    />
                                )}
                            </Fragment>
                        );
                    }
                })}
            {slice.variation === "default" && (
                <>
                    {!clientOnly && (
                        <ImageComponent
                            field={slice.primary?.image}
                            loadingProps={loadingProps}
                        />
                    )}
                    {clientOnly && (
                        <PrismicNextImage
                            field={slice.primary?.image}
                            fallbackAlt=""
                        />
                    )}
                </>
            )}
        </Gallery>
    );
};

import { CSSProperties, FC, Fragment } from "react";

import { ImageField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { ImageComponent } from "@/components/image/image";
import { ImageProps } from "@/slices/Image";

import { ImageSliceVariation } from "../../../prismicio-types";
import styles from "./image.module.scss";

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

const getSmartImages = (images: ImageField[]) => {
    const width = images.reduce(
        (acc, item) => acc + (item?.dimensions?.width ?? 0),
        0
    );

    const height = Math.max(
        ...images.map((item) => item.dimensions?.height ?? 0)
    );

    const items = images
        ?.map((item) => {
            return item.dimensions;
        })
        .filter((item) => item !== undefined && item !== null);
    return { width, height, items };
};

export const Image: FC<ImageProps> = ({ slice, context }) => {
    const color = (context as any)?.loadingColor;
    const { clientOnly } = context as any;

    const items =
        slice.variation !== "default" ? slice.primary?.images : undefined;
    const variation = slice.variation;
    const blockSizeType =
        variation === "smart" ? undefined : slice.primary?.height_variant;
    const height = (slice.primary as any).height as number;
    const inlineSizeType =
        variation === "default" ? slice.primary.width_variant : undefined;
    const loadingProps = {
        className: styles.gallery_image,
        style: {
            backgroundColor: color,
            objectFit: "cover" as CSSProperties["objectFit"],
            width: "100%",
            height: "100%",
        },
    };

    const smartImages = getSmartImages(items?.map((item) => item.image) ?? []);

    return (
        <Gallery
            layoutType={imageVariants[variation]?.className}
            as={"div"}
            gap="small"
            blockSizeType={blockSizeType}
            inlineSizeType={inlineSizeType}
            fixedHeightValue={height}
            smartImages={smartImages}
        >
            {slice.variation !== "default" &&
                items?.slice(0, imageVariants[variation].items)?.map((item) => {
                    if (isFilled.image(item.image)) {
                        return (
                            <Fragment key={`${slice.id}__${item.image.id}`}>
                                {!clientOnly && (
                                    <ImageComponent field={item.image} />
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
                        <ImageComponent field={slice.primary?.image} />
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

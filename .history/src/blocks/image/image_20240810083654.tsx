import { CSSProperties, FC, Fragment } from "react";

import { isFilled } from "@prismicio/client";
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

export const Image: FC<ImageProps> = ({ slice, context }) => {
    const color = (context as any)?.loadingColor;
    const { clientOnly } = context as any;

    const items =
        slice.variation !== "default" ? slice.primary?.images : undefined;
    const variation = slice.variation;
    const blockSizeType =
        variation !== "smart"
            ? slice.primary?.height_variant ?? "default"
            : undefined;
    const height =
        variation !== "smart" ? (slice.primary?.height as number) : undefined;
    const inlineSizeType =
        variation === "default"
            ? slice.primary.width_variant
            : variation === "smart"
              ? "auto"
              : undefined;
    const imageClassName = clsx(
        styles.gallery_image,
        styles.gallery_image_container
    );
    const loadingProps = {
        className: styles.gallery_image,
        style: {
            backgroundColor: color,
            objectFit: "cover" as CSSProperties["objectFit"],
            width: "100%",
            height: "100%",
        },
    };
    console.log(items);

    return (
        <Gallery
            layoutType={imageVariants[variation]?.className}
            as={"div"}
            gap="small"
            blockSizeType={blockSizeType}
            inlineSizeType={inlineSizeType}
            fixedHeightValue={height}
        >
            {slice.variation !== "default" &&
                items?.slice(0, imageVariants[variation].items)?.map((item) => {
                    if (isFilled.image(item.image)) {
                        return (
                            <Fragment key={`${slice.id}__${item.image.id}`}>
                                {!clientOnly && (
                                    <ImageComponent
                                        field={item.image}
                                        className={imageClassName}
                                        loadingProps={loadingProps}
                                    />
                                )}
                                {clientOnly && (
                                    <PrismicNextImage
                                        className={imageClassName}
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
                            className={imageClassName}
                            loadingProps={loadingProps}
                        />
                    )}
                    {clientOnly && (
                        <PrismicNextImage
                            className={imageClassName}
                            field={slice.primary?.image}
                            fallbackAlt=""
                        />
                    )}
                </>
            )}
        </Gallery>
    );
};

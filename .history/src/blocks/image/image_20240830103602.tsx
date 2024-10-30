import { FC } from "react";

import { isFilled } from "@prismicio/client";

import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { ImageComponent } from "@/components/image/image";
import {
    SmartGrid,
    SmartGridBreakpoints,
} from "@/components/smart-grid/smart-grid";
import { ImageProps } from "@/slices/Image";

import { ImageSliceVariation } from "../../../prismicio-types";

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

export const Image: FC<ImageProps> = ({ slice }) => {
    const variation = slice.variation;

    if (variation === "smart") {
        const items = slice.primary?.images;
        const layouts = slice.primary.layouts;

        const breakpoints: SmartGridBreakpoints = {};

        layouts?.map((layout) => {
            breakpoints[layout.breakpoint] = {
                columns: parseInt(layout.columns),
                gutter: layout.gutter,
            };
        });

        return (
            <SmartGrid breakpoints={breakpoints} as="section">
                {items
                    ?.slice(0, imageVariants[variation].items)
                    ?.map((item) => {
                        if (isFilled.image(item.image)) {
                            return (
                                <ImageComponent
                                    field={item.image}
                                    key={`${slice.id}__${item.image.id}`}
                                    data-smart-width={
                                        item.image.dimensions.width
                                    }
                                    data-smart-height={
                                        item.image.dimensions.height
                                    }
                                />
                            );
                        }
                    })}
            </SmartGrid>
        );
    } else if (variation === "default") {
        const blockSizeType = slice.primary?.height_variant;
        const height = slice.primary.height as number;
        const inlineSizeType = "default";

        return (
            <Gallery
                layoutType={imageVariants[variation]?.className}
                as={"div"}
                gap="small"
                blockSizeType={blockSizeType}
                inlineSizeType={inlineSizeType}
                fixedHeightValue={height}
            >
                <ImageComponent field={slice.primary?.image} />
            </Gallery>
        );
    } else {
        const items = slice.primary?.images;
        const blockSizeType = slice.primary?.height_variant;
        const height = slice.primary.height as number;
        const inlineSizeType = "default";

        return (
            <Gallery
                layoutType={imageVariants[variation]?.className}
                as={"div"}
                gap="small"
                blockSizeType={blockSizeType}
                inlineSizeType={inlineSizeType}
                fixedHeightValue={height}
            >
                {variation !== "default" &&
                    items
                        ?.slice(0, imageVariants[variation].items)
                        ?.map((item) => {
                            if (isFilled.image(item.image)) {
                                return (
                                    <ImageComponent
                                        field={item.image}
                                        key={`${slice.id}__${item.image.id}`}
                                    />
                                );
                            }
                        })}
                {variation === "default" && (
                    <ImageComponent field={slice.primary?.image} />
                )}
            </Gallery>
        );
    }
};

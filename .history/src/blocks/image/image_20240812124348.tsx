import { FC } from "react";

import { isFilled } from "@prismicio/client";

import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { ImageComponent } from "@/components/image/image";
import { SmartGrid } from "@/components/smart-grid/smart-grid";
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
    const items =
        slice.variation !== "default" ? slice.primary?.images : undefined;
    const variation = slice.variation;
    const blockSizeType =
        variation === "smart" ? undefined : slice.primary?.height_variant;
    const height = (slice.primary as any).height as number;
    const inlineSizeType =
        variation === "default" ? slice.primary.width_variant : undefined;

    if (variation !== "smart")
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

    if (variation === "smart")
        
    {const layouts = slice.primary.layouts return (
        <SmartGrid
            gutter={slice.primary.gutter}
            breakpoints={{
                mobile: parseInt(slice.primary.columns_mobile),
                tablet: parseInt(slice.primary.columns_desktop),
                desktop: parseInt(slice.primary.columns_desktop),
            }}
        >
            {items
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
        </SmartGrid>
    );}
       
};

import { FC } from "react";

import { hasProjectData } from "@/lib/helpers";

import {
    ProjectGallerySlice,
    ProjectGallerySliceVariation,
} from "../../../prismicio-types";
import { Gallery } from "../gallery/gallery";
import { GalleryItem } from "./gallery-item";

type Variants = ProjectGallerySliceVariation["variation"];

type VariantProps = Record<Variants, { items: number; className: string }>;

const VARIANT_PROPS: VariantProps = {
    default: { items: 3, className: "default" },
    gallery1X1: { items: 2, className: "one_one" },
    gallery1X2: { items: 2, className: "one_two" },
    gallery2X1: { items: 2, className: "two_one" },
    gallery075X1X075: { items: 3, className: "small_big_small" },
};

type GalleryProps = {
    slice: ProjectGallerySlice;
};

export const ProjectGallery: FC<GalleryProps> = ({ slice }) => {
    const items = slice.primary.projects;
    const variation = slice.variation || "default";

    return (
        <Gallery variation={variation}>
            {items.slice(0, VARIANT_PROPS[variation].items).map((item) => {
                if (hasProjectData(item.project))
                    return (
                        <GalleryItem
                            key={`${slice.id}__${item.project.id}`}
                            item={item}
                        />
                    );
            })}
        </Gallery>
    );
};

import { GalleryItem } from "@/blocks/project-gallery/item/gallery-item-suspense";
import { Gallery, GalleryClassNames } from "@/components/gallery/gallery";
import { ProjectGalleryProps } from "@/slices/ProjectGallery";

import { ProjectGallerySliceVariation } from "../../../prismicio-types";

export type ProjectGalleryVariants = ProjectGallerySliceVariation["variation"];

type GalleryVariantsProps = Record<
    ProjectGalleryVariants,
    { items: number; className: GalleryClassNames }
>;

const GalleryVariants: GalleryVariantsProps = {
    default: { items: Infinity, className: "default" },
    gallerySmallXBig: { items: 2, className: "one_two" },
    galleryBigXSmall: { items: 2, className: "two_one" },
    gallerySmallXBigXSmall: { items: 3, className: "small_big_small" },
    galleryBigXSmallXBig: { items: 3, className: "big_small_big" },
};

type ProjectGalleryComponentProps = ProjectGalleryProps;

export const ProjectGallery = ({ slice }: ProjectGalleryComponentProps) => {
    const items = slice.primary?.projects;

    const variation = slice.variation || "default";
    const gap = slice.primary.gutter === "tiny" ? "film" : "small";

    return (
        <Gallery className={GalleryVariants[variation]?.className} gap={gap}>
            {items?.slice(0, GalleryVariants[variation].items)?.map((item) => {
                return (
                    <GalleryItem
                        key={`${slice.id}__${(item as any).id}`}
                        item={item}
                    />
                );
            })}
        </Gallery>
    );
};

import { FC } from "react";

import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySlice } from "../../../prismicio-types";
import { Gallery } from "../gallery/gallery";
import { GalleryItem } from "./gallery-item";

type GalleryProps = {
    slice: ProjectGallerySlice;
};

export const ProjectGalleryCompoment: FC<GalleryProps> = ({ slice }) => {
    const items = slice.primary.projects;
    const variation = slice.variation || "default";
    console.log(items);
    return (
        <Gallery variation={variation}>
            {items.map((item) => {
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

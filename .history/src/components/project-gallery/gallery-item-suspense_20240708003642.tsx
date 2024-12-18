"use server";
import { FC } from "react";

import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { WithSuspenseComponent } from "../with-suspense-component";
import { GalleryItemServer } from "./gallery-item";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project } = item;

    if (hasProjectData(project)) {
        return (
            <WithSuspenseComponent
                fallback={
                    <ImageLoading
                        style={{ aspectRatio: "16/10" }}
                        loadingOptions={{
                            color: project.data.color ?? defaultColor,
                        }}
                    />
                }
            >
                <GalleryItemServer item={item} />
            </WithSuspenseComponent>
        );
    }
};

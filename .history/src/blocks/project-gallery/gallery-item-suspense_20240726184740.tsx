import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { colord } from "colord";

import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { WithSuspenseComponent } from "../WithSuspense";
import styles from "./project-gallery.module.scss";
import { GalleryItem } from "./project-gallery-item";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project } = item;

    const backgroundColor =
        hasProjectData(project) && isFilled.color(project.data.color)
            ? colord(project.data?.color).lighten(0.2).toHex()
            : defaultColor;

    return (
        <WithSuspenseComponent
            fallback={
                <ImageLoading
                    className={styles.item}
                    style={{ aspectRatio: 1.6, backgroundColor }}
                />
            }
        >
            <GalleryItem item={item} />
        </WithSuspenseComponent>
    );
};

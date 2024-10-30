import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { colord } from "colord";

import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { WithSuspenseComponent } from "../WithSuspense";
import { GalleryItemServer } from "./gallery-item";
import styles from "./gallery-item.module.scss";

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
        // <WithSuspenseComponent
        //     fallback={
        //         <ImageLoading
        //             className={styles.item}
        //             style={{ aspectRatio: "16/10" }}
        //             loadingOptions={{
        //                 color:backgroundColor,
        //             }}
        //         />
        //     }
        // >
        <GalleryItemServer item={item} />
        // </WithSuspenseComponent>
    );
};

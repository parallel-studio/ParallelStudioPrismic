import { FC } from "react";

import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { WithSuspenseComponent } from "../WithSuspense";
import { GalleryItemServer } from "./gallery-item";
import styles from "./gallery-item.module.scss";
import { colord } from "colord";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project } = item;

    const backgroundColor = hasProjectData(project)
        ? colord(project.data?.color).lighten(0.2).toHex()
        : "var(--gray-color)";
    return (
        <WithSuspenseComponent
            fallback={
                <ImageLoading
                    className={styles.item}
                    style={{ aspectRatio: "16/10" }}
                    loadingOptions={{
                        color: hasProjectData(project)
                            ? (project.data.color as string)
                            : defaultColor,
                    }}
                />
            }
        >
            <GalleryItemServer item={item} />
        </WithSuspenseComponent>
    );
};

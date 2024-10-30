import { FC } from "react";

import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { WithSuspenseComponent } from "../with-suspense-component";
import { GalleryItemServer } from "./gallery-item";
import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project } = item;

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
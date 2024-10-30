"use server";
import { FC } from "react";

import clsx from "clsx";

import { hasClientData, hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";
import { GalleryItemClient } from "./gallery-item-client";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, description, color } = project.data;

        return (
            <li className={clsx(styles.item, display)}>
                <GalleryItemClient item={item} />
            </li>
        );
    }
};

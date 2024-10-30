"use server";
import { FC } from "react";

import clsx from "clsx";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";
import { GalleryItemClient } from "./gallery-item-client";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = async ({ item }) => {
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const muxData = await getMuxBlurUp({
            muxPlaybackId: project.data.video,
        });
        return (
            <li className={clsx(styles.item)}>
                <GalleryItemClient item={item} muxData={muxData} />
            </li>
        );
    }
};

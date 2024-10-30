"use client";
import { FC } from "react";

import {
    ProjectDescriptionSliceDefaultPrimary,
    ProjectGallerySlice,
} from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";
import { ProjectGalleryProps } from "@/slices/ProjectGallery";

type GalleryItemProps = {
    item: ProjectGalleryProps[""];
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    return <li className={styles.wrapper}>Gallery</li>;
};

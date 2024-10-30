"use client";
import { FC } from "react";

import { ProjectGallerySlice } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    slice: ProjectGallerySlice;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    return <li className={styles.wrapper}>Gallery</li>;
};

"use client";
import { FC } from "react";

import { ProjectGallerySlice } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    slice: ProjectGallerySlice;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    return <ul className={styles.wrapper}>Gallery</ul>;
};

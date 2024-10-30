"use client";
import { FC } from "react";

import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: string;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    return <li className={styles.wrapper}>Gallery</li>;
};

"use client";
import { FC, useRef } from "react";

import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: string;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    const videoRef = useRef<HTMLAnchorElement>(null);

    return <li className={styles.wrapper}>Gallery</li>;
};

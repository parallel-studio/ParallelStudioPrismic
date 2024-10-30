"use client";
import { FC, useRef } from "react";

import { useVideoStart } from "@/hooks/useVideoStart";

import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: string;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
    const videoRef = useRef<HTMLAnchorElement>(null);
    const { isHovering } = useVideoStart({ ref: videoRef });

    return <li className={styles.wrapper}>Gallery</li>;
};

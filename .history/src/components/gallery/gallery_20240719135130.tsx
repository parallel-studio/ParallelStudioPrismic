import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./gallery.module.scss";

type GalleryGap = "small" | "medium" | "film";

export type GalleryClassNames =
    | "default"
    | "one_two"
    | "two_one"
    | "small_big_small"
    | "big_small_big"
    | "three_to_one"
    | "one_to_three";

export type GalleryBlockSizes = "simple" | "double";
export type GallerHeight = "default" | "fixed" | "auto";

type GalleryProps = {
    children: ReactNode;
    as?: ElementType;
    className?: GalleryClassNames;
    gap?: GalleryGap;
    blockSize?: GalleryBlockSizes;
    height?: GallerHeight;
};

export const Gallery: FC<GalleryProps> = ({
    as: Tag = "ul",
    children,
    className = "default",
    gap = "small",
    blockSize,
    height = "default",
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[className],
                styles[`gap_${gap}`],
                blockSize ? styles[blockSize] : undefined
            )}
        >
            {children}
        </Tag>
    );
};

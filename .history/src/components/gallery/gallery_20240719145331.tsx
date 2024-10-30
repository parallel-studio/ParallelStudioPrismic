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

export type GalleryBlockSizes = "default" | "fixed" | "auto";

type GalleryProps = {
    children: ReactNode;
    as?: ElementType;
    className?: GalleryClassNames;
    gap?: GalleryGap;
    blockSize?: GalleryBlockSizes;
    height?: number;
};

export const Gallery: FC<GalleryProps> = ({
    as: Tag = "ul",
    children,
    className = "default",
    gap = "small",
    blockSize = "default",
    height,
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[className],
                styles[`gap_${gap}`]
            )}
        >
            {children}
        </Tag>
    );
};

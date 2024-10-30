"use client";
import { Children, cloneElement, ElementType, FC, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

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

const getBlockStyle = ({
    blockSize,
    height = 300,
}: {
    blockSize?: GalleryBlockSizes;
    height?: number;
}) => {
    switch (blockSize) {
        case "fixed":
            return `${height}px`;
            break;
        case "auto":
            return `100%`;
            break;
        default:
            return `max(325px, 20svw)`;
            break;
    }
};

export const Gallery: FC<GalleryProps> = ({
    as: Tag = "ul",
    children,
    className = "default",
    gap = "small",
    blockSize = "default",
    height,
}) => {
    const blockStyle = getBlockStyle({ blockSize, height });

    const { className: styledsClassName, styles: styleds } = css.resolve`
        > * > * {
            block-size: ${blockStyle};
        }
    `;

    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[className],
                styles[`gap_${gap}`],
                styledsClassName
                // blockSize === "fixed" || blockSize === undefined
                //     ? undefined
                //     : styles[`block_${blockSize}`]
                //     ,
            )}
            // styles={{
            //     blockSize: test,
            // }}
        >
            {styleds}
            {children}
        </Tag>
    );
};

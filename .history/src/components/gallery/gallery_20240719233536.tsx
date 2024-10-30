import { ElementType, FC, ReactNode } from "react";

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

export const Gallery: FC<GalleryProps> = ({
    as: Tag = "ul",
    children,
    className = "default",
    gap = "small",
    blockSize = "default",
    height,
}) => {
    const { className: styledsClassName, styles: styleds } = css.resolve`
    ${Tag} {
 > * > * {
      block-size: ${blockSize === "default" ? `max(325px, 20svw)` : blockSize === "fixed" ? `${height}px` : blockSize === "auto" ? `100%` : undefined};
    }
`;

    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[className],
                styles[`gap_${gap}`],
                blockSize === "fixed" || blockSize === undefined
                    ? undefined
                    : styles[`block_${blockSize}`]
            )}
            // styles={{
            //     blockSize: blockSize === "fixed" ? `${height}px` : undefined,
            // }}
        >
            {children}
        </Tag>
    );
};

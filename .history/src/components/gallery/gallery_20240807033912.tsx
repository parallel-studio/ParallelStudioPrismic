"use client";
import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import { Section } from "../section/section";
import styles from "./gallery.module.scss";

type GalleryGap = "small" | "medium" | "film";

export type GalleryClassNames =
    | "default"
    | "one_two"
    | "two_one"
    | "small_big_small"
    | "big_small_big"
    | "three_to_one"
    | "one_to_three"
    | "bannerAutoGrid";

export type GalleryBlockSizes = "default" | "fixed" | "auto" | "double";

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
        case "double":
            return `calc(2 * var(--block-height-base))`;
        default:
            return `var(--block-height-base)`;
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
    const { className: styledsClassName, styles: styleds } = css.resolve`
        ${Tag} {
            :global(img) {
                block-size: ${getBlockStyle({ blockSize, height })};
            }
        }
    `;

    return (
        <Section>
            <Tag
                className={clsx(
                    styles.container,
                    styles[gap],
                    styles[className],
                    styledsClassName
                )}
            >
                {styleds}
                {children}
            </Tag>
        </Section>
    );
};

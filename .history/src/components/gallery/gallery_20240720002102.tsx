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
    const { className: styledsClassName, styles: styleds } = css.resolve`
        ${Tag} {
            img {
                block-size: ${getBlockStyle({ blockSize, height })};
            }
        }
    `;

    return (
        <Section className={clsx(styles[gap])}>
            <Tag
                className={clsx(
                    styles.container,
                    styles[className],
                    styles[`container_${gap}`],
                    styledsClassName,
                    "gallery"
                )}
            >
                {children}
                {styleds}
            </Tag>
        </Section>
    );
};

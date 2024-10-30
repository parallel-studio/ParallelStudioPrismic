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
    layoutType?: GalleryClassNames;
    gap?: GalleryGap;
    blockSizeType?: GalleryBlockSizes;
    fixedHeightValue?: number;
};

const getBlockStyle = ({
    blockSizeType,
    fixedHeightValue = 300,
}: {
    blockSizeType?: GalleryBlockSizes;
    fixedHeightValue?: number;
}) => {
    switch (blockSizeType) {
        case "fixed":
            return `${fixedHeightValue}px`;
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
    layoutType = "default",
    gap = "small",
    blockSizeType = "default",
    fixedHeightValue,
}) => {
    const { className: styledsClassName, styles: styleds } = css.resolve`
        ${Tag} {
            :global(img) {
                block-size: ${getBlockStyle({
                    blockSizeType,
                    fixedHeightValue,
                })};
            }
        }
    `;

    return (
        <Section>
            <Tag
                className={clsx(
                    styles.container,
                    styles[gap],
                    styles[layoutType],
                    styledsClassName
                )}
            >
                {styleds}
                {children}
            </Tag>
        </Section>
    );
};

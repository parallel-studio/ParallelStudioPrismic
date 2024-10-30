"use client";
import { ElementType, FC, ReactNode, useEffect } from "react";

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
    | "bannerAutoGrid"
    | "smart";

export type GalleryBlockSizes =
    | "default"
    | "fixed"
    | "auto"
    | "double"
    | "full_screen";

type GalleryInlineSizes = "default" | "auto";

type GalleryProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    layoutType?: GalleryClassNames;
    gap?: GalleryGap;
    blockSizeType?: GalleryBlockSizes;
    inlineSizeType?: GalleryInlineSizes;
    fixedHeightValue?: number;
    className?: string;
    smartImages?: {
        width: number;
        height: number;
    }[];
};

export const Gallery: FC<GalleryProps<ElementType>> = ({
    as: Tag = "ul",
    children,
    layoutType = "default",
    gap = "small",
    blockSizeType = "default",
    inlineSizeType = "default",
    fixedHeightValue,
    className,
    smartImages: smartItems,
}) => {
    const { className: styledsClassName, styles: styleds } = css.resolve`
        ${Tag} {
            min-block-size: ${fixedHeightValue}px;

            :global(img) {
                block-size: ${fixedHeightValue}px;
            }
        }
    `;

    //     const { className: smartClass, styles: smartLayout } = css.resolve`
    //         ${Tag} {
    //             aspect-ratio:;
    // ${smartItems?.map((item, index) => )}
    //             :global(img) {
    //                 block-size: ${fixedHeightValue}px;
    //             }
    //         }
    //     `;

    useEffect(() => {
        if (smartItems && layoutType === "smart") {
        }
    }, [smartItems, layoutType]);

    return (
        <Section className={className}>
            <Tag
                className={clsx(
                    styles.container,
                    styles[gap],
                    styles[layoutType],
                    styles[`block_${blockSizeType}`],
                    blockSizeType === "fixed" &&
                        fixedHeightValue &&
                        inlineSizeType === "default"
                        ? styledsClassName
                        : undefined,
                    styles[`inline_${inlineSizeType}`]
                )}
            >
                {styleds}
                {children}
            </Tag>
        </Section>
    );
};
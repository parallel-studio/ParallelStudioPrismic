"use client";
import { ElementType, FC, ReactNode, useLayoutEffect, useRef } from "react";
import { useWindowSize } from "react-use";

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
        items: {
            width: number;
            height: number;
        }[];
    };
};

const GUTTER_SIZE = 20;

export const Gallery: FC<GalleryProps<ElementType>> = ({
    as: Tag = "ul",
    children,
    layoutType = "default",
    gap = "small",
    blockSizeType,
    inlineSizeType,
    fixedHeightValue,
    className,
    smartImages,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useWindowSize();

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (
            container &&
            smartImages &&
            layoutType === "smart" &&
            smartImages.items.length > 0
        ) {
            const imgNodes = container.getElementsByTagName("img");

            const columns = imgNodes.length;
            const rows = Math.ceil(imgNodes.length / columns);

            if (!imgNodes) return;

            Array.from(imgNodes).forEach((imgNode, index) => {
                const item = smartImages.items[index];
                if (!item) return;
                const containerWidth = container.clientWidth;
                const imagesWidth = smartImages.width;
                const factor = containerWidth / imagesWidth;
                const gutterCorrection =
                    ((columns - 1) * GUTTER_SIZE) / columns;
                const width = `${item.width * factor - gutterCorrection}px`;
                const height = `${item.height * factor - gutterCorrection}px`;

                imgNode.setAttribute("width", width);
                imgNode.setAttribute("height", height);
            });
        }
    }, [smartImages, layoutType, width]);

    return (
        <Tag ref={containerRef} className={clsx(styles.container)}>
            {children}
        </Tag>
    );
};

"use client";
import {
    ElementType,
    FC,
    ReactNode,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
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
    blockSizeType = "default",
    inlineSizeType = "default",
    fixedHeightValue,
    className,
    smartImages,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { className: styledsClassName, styles: styleds } = css.resolve`
        ${Tag} {
            min-block-size: ${fixedHeightValue}px;

            :global(img) {
                block-size: ${fixedHeightValue}px;
            }
        }
    `;
    const { width } = useWindowSize();

    const imgNodes = useMemo(
        () => containerRef?.current?.getElementsByTagName("img"),
        [children]
    );

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (
            container &&
            smartImages &&
            layoutType === "smart" &&
            smartImages.items.length > 0
        ) {
            // const imgNodes = container.getElementsByTagName("img");
            const containerWidth = container.clientWidth;
            const imagesWidth = smartImages.width;
            const factor = containerWidth / imagesWidth;
            if (!imgNodes) return;

            Array.from(imgNodes).forEach((imgNode, index) => {
                const item = smartImages.items[index];
                if (!item) return;
                const gutterCorrection =
                    ((imgNodes.length - 1) * GUTTER_SIZE) / imgNodes.length;
                const width = `${item.width * factor - gutterCorrection}px`;
                const height = `${item.height * factor - gutterCorrection}px`;

                imgNode.setAttribute("width", width);
                imgNode.setAttribute("height", height);
            });
        }
    }, [smartImages, layoutType, width, imgNodes]);

    return (
        <Section className={className}>
            <Tag
                ref={containerRef}
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

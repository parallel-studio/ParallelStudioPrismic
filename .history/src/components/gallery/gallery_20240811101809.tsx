"use client";
import {
    ElementType,
    FC,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

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

    // useLayoutEffect(() => {
    //     const container = containerRef.current;
    //     console.log(container?.querySelectorAll("img"));
    //     if (container && smartImages && layoutType === "smart") {
    //         const imgNodes = container.querySelectorAll("img");
    //         const containerWidth = container.clientWidth;
    //         const imgNodesWidth = Array.from(smartImages).reduce(
    //             (acc, smartImage) => acc + smartImage.width,
    //             0
    //         );
    //         const factor = containerWidth / imgNodesWidth;

    //         imgNodes.forEach((imgNode, index) => {
    //             const gutterCorrection =
    //                 ((imgNodes.length - 1) * 20) / imgNodes.length;
    //             const width = `${smartImages[index].width * factor - gutterCorrection}px`;
    //             const height = `${smartImages[index].height * factor - gutterCorrection}px`;

    //             imgNode.setAttribute("width", width);
    //             imgNode.setAttribute("height", height);
    //             imgNode.style.width = width;
    //             imgNode.style.height = height;
    //         });
    //     }
    // }, [smartImages, layoutType, containerRef]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (container && smartImages && layoutType === "smart") {
            const imgNodes = container.getElementsByTagName("img");
            const containerWidth = container.clientWidth;
            const imgNodesWidth = Array.from(smartImages).reduce(
                (acc, smartImage) => acc + smartImage.width,
                0
            );
            const factor = containerWidth / imgNodesWidth;

            console.log("NODELIST", Array.from(imgNodes));

            Array.from(imgNodes).forEach((imgNode, index) => {
                const gutterCorrection =
                    ((imgNodes.length - 1) * 20) / imgNodes.length;
                const width = `${smartImages[index].width * factor - gutterCorrection}px`;
                const height = `${smartImages[index].height * factor - gutterCorrection}px`;

                imgNode.setAttribute("width", width);
                imgNode.setAttribute("height", height);
                imgNode.style.width = width;
                imgNode.style.height = height;
            });
        }
    }, [smartImages, layoutType, containerRef]);

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

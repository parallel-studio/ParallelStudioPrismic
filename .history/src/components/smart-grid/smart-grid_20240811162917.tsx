"use client";
import React, {
    Children,
    ElementType,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
    ReactPortal,
    useLayoutEffect,
    useRef,
} from "react";
import { useWindowSize } from "react-use";

import clsx from "clsx";
import css from "styled-jsx/css";

import { Section } from "../section/section";
import styles from "./gallery.module.scss";

type SmartImage = {
    width: number;
    height: number;
    items: {
        width: number;
        height: number;
    }[];
};

type GalleryProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
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
const isReactPortal = (child: ReactNode): child is ReactPortal => {
    return (child as ReactPortal).type === "ReactPortal";
};

const getSmartImages = (children: ReactNode): SmartImage => {
    const items: { width: number; height: number }[] = [];

    Children.forEach(children, (child) => {
        if (isValidElement(child) && !isReactPortal(child) && child.ref) {
            const element = child.ref.current as HTMLElement;
            if (element) {
                items.push({
                    width: element.clientWidth,
                    height: element.clientHeight,
                });
            }
        }
    });

    const width = items.reduce((acc, item) => acc + item.width, 0);
    const height = Math.max(...items.map((item) => item.height));

    return { width, height, items };
};
const GUTTER_SIZE = 20;

export const Gallery: FC<GalleryProps<ElementType>> = ({
    as: Tag = "ul",
    children,
    smartImages,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useWindowSize();

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (container && smartImages && smartImages.items.length > 0) {
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
    }, [smartImages, width]);

    return (
        <Tag ref={containerRef} className={clsx(styles.container)}>
            {children}
        </Tag>
    );
};

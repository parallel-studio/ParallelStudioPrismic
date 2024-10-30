"use client";
import React, {
    Children,
    ElementType,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import { getElementName, onlyValid } from "react-children-utilities";
import { useWindowSize } from "react-use";

import clsx from "clsx";

type SmartImage = {
    width: number;
    height: number;
    items: {
        width: number;
        height: number;
    }[];
};

type SmartGridProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    className?: string;
};

const GUTTER_SIZE = 20;

const getSmartImage = (container: HTMLDivElement): SmartImage => {
    const items: { width: number; height: number }[] = [];
    const children = container.childNodes;

    children.forEach((child) => {
        console.log(child);
        if (isValidElement(child) && getElementName(child) === "img") {
            const element = child.ref?.current;

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

export const SmartGrid: FC<SmartGridProps<ElementType>> = ({
    as: Tag = "div",
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useWindowSize();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const smartImage = getSmartImage(container);

        if (container && smartImage && smartImage.items.length > 0) {
            const imgNodes = container.getElementsByTagName("img");

            const columns = imgNodes.length;
            const rows = Math.ceil(imgNodes.length / columns);

            if (!imgNodes) return;

            Array.from(imgNodes).forEach((imgNode, index) => {
                const item = smartImage.items[index];
                if (!item) return;
                const containerWidth = container.clientWidth;
                const imagesWidth = smartImage.width;
                const factor = containerWidth / imagesWidth;
                const gutterCorrection =
                    ((columns - 1) * GUTTER_SIZE) / columns;
                const width = `${item.width * factor - gutterCorrection}px`;
                const height = `${item.height * factor - gutterCorrection}px`;

                imgNode.setAttribute("width", width);
                imgNode.setAttribute("height", height);
            });
        }
    }, [width]);

    return <Tag ref={containerRef}>{children}</Tag>;
};

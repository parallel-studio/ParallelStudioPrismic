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
    useState,
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
const COLUMNS = 1;

const getSmartImage = (
    container: HTMLDivElement,
    columns: number
): SmartImage => {
    const items: { width: number; height: number }[] = [];
    const children = container.childNodes;

    children.forEach((child) => {
        if (child.nodeName === "IMG") {
            const element = child as HTMLImageElement;
            if (element) {
                items.push({
                    width: element.clientWidth,
                    height: element.clientHeight,
                });
            }
        }
    });

    const width = items
        .slice(0, columns)
        .reduce((acc, item) => acc + item.width, 0);
    const height = Math.max(...items.map((item) => item.height));

    return { width, height, items };
};

export const SmartGrid: FC<SmartGridProps<ElementType>> = ({
    as: Tag = "div",
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [smartImage, setStartImage] = useState<SmartImage>();

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        setStartImage(getSmartImage(container, COLUMNS));
    }, []);

    const { width } = useWindowSize();

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        if (smartImage && smartImage.items.length > 0) {
            const imgNodes = container.getElementsByTagName("img");

            if (!imgNodes) return;

            const columns = COLUMNS;
            const rows = Math.ceil(imgNodes.length / columns);

            const containerWidth = container.clientWidth;
            const initialRowWidth = smartImage.width;
            const factor = containerWidth / initialRowWidth;

            console.log(
                "CONTAINER_WIDTH",
                containerWidth,
                "INITIAL_ROW",
                initialRowWidth,
                "FACTOR",
                factor
            );

            const images = smartImage.items;

            let table: {
                width: number;
                height: number;
                x: number;
                y: number;
            }[] = [];

            images.map((img, index) => {
                const row = Math.floor(index / columns);
                const column = index % columns;
                const width =
                    row === 0 ? img.width * factor : table[column].width;
                const height = (img.height * width) / img.width;
                const x = column === 0 ? 0 : table[column - 1].width;
                const y = row === 0 ? 0 : table[column - 1].height;
                table.push({
                    width,
                    height,
                    x,
                    y,
                });
            });

            console.log(table);

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
    }, [width, smartImage]);

    return <Tag ref={containerRef}>{children}</Tag>;
};

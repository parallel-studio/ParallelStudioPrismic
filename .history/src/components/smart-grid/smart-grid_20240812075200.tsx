"use client";
import React, {
    ElementType,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
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

type Gutter = "medium" | "small" | "tiny";

type SmartGridProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    className?: string;
    columns?: number;
    gutter?: Gutter;
};

const ORIGIN_X = 0;
const ORIGIN_Y = 0;

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
    columns = 1,
    gutter = "medium",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [smartImage, setStartImage] = useState<SmartImage>();
    const GUTTER_SIZE = (gutter: Gutter) => {
        switch (gutter) {
            case "small":
                return 10;
                break;
            case "tiny":
                return 3;
                break;
            case "medium":
            default:
                return 20;
                break;
        }
    };

    const COLUMNS = 3;

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
            const imgCollection = container.getElementsByTagName("img");

            if (!imgCollection) return;

            const columns = COLUMNS;
            const rows = Math.ceil(imgCollection.length / columns);

            const containerWidth = container.clientWidth;
            const initialRowWidth = smartImage.width;
            const factor = containerWidth / initialRowWidth;

            let table: {
                column: number;
                row: number;
                width: number;
                height: number;
                x: number;
                y: number;
            }[] = [];

            const images = smartImage.items;

            images.map((img, index) => {
                const row = Math.floor(index / columns);
                const column = index % columns;
                const width =
                    row === 0
                        ? img.width * factor -
                          ((columns - 1) * GUTTER_SIZE) / columns
                        : table[column].width;
                const height = (img.height * width) / img.width;
                const x =
                    column === 0
                        ? ORIGIN_X
                        : table
                              .map((item) => item.width)
                              .reduce(
                                  (acc, item, i) =>
                                      i < column
                                          ? acc + item + GUTTER_SIZE
                                          : acc,
                                  ORIGIN_X
                              );
                const y =
                    row === 0
                        ? ORIGIN_Y
                        : table
                              .map((item) => [
                                  item.height,
                                  item.row,
                                  item.column,
                              ])
                              .reduce(
                                  (acc, item, i) =>
                                      item[2] === column
                                          ? acc + item[0] + GUTTER_SIZE
                                          : acc,
                                  ORIGIN_Y
                              );

                table.push({
                    column,
                    row,
                    width,
                    height,
                    x,
                    y,
                });
            });

            const containerHeight = Math.max(
                ...table.map((item) => item.height + item.y)
            );

            container.style.height = `${containerHeight}px`;

            Array.from(imgCollection).forEach((imgElement, index) => {
                const item = table[index];
                if (!item) return;

                const width = `${item.width}px`;
                const height = `${item.height}px`;

                imgElement.setAttribute("width", width);
                imgElement.setAttribute("height", height);
                imgElement.style.position = "absolute";
                imgElement.style.top = `${item.y}px`;
                imgElement.style.left = `${item.x}px`;
                imgElement.style.width = width;
                imgElement.style.height = height;
            });
        }
    }, [width, smartImage]);

    return (
        <Tag ref={containerRef} style={{ position: "relative" }}>
            {children}
        </Tag>
    );
};

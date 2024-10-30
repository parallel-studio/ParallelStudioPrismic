"use client";
import React, {
    ElementType,
    FC,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useWindowSize } from "react-use";

import { useLayout } from "@/context/layout";
import { Layout } from "@/hooks/useActiveLayout";

type SmartImage = {
    width: number;
    height: number;
    items: {
        width: number;
        height: number;
    }[];
};

type Gutter = "big" | "medium" | "small";

export type SmartGridBreakpoints = Partial<
    Record<Layout, { columns: number; gutter: Gutter }>
>;

type SmartGridProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    className?: string;
    breakpoints?: SmartGridBreakpoints;
};

const ORIGIN_X = 0;
const ORIGIN_Y = 0;
const DEFAULT_BREAKPOINTS: SmartGridBreakpoints = {
    mobile: { columns: 2, gutter: "big" },
    tablet: { columns: 2, gutter: "big" },
    desktop: { columns: 3, gutter: "big" },
};
const DEFAULT_BREAKPOINT: Layout = "desktop";

const getSize = (value: Gutter) => {
    switch (value) {
        case "small":
            return 3;
            break;
        case "medium":
            return 10;
            break;
        case "big":
        default:
            return 20;
            break;
    }
};

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
    breakpoints = DEFAULT_BREAKPOINTS,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [smartImage, setStartImage] = useState<SmartImage>();
    const { width } = useWindowSize();
    const { activeLayout } = useLayout();

    const currentBreakpoint =
        activeLayout === "tablet"
            ? DEFAULT_BREAKPOINT
            : activeLayout ?? DEFAULT_BREAKPOINT;

    const currentLayout =
        breakpoints[currentBreakpoint] ??
        DEFAULT_BREAKPOINTS[currentBreakpoint];

    const gutterSize = getSize(currentLayout!.gutter);

    const columns = useMemo(() => {
        const count =
            smartImage?.items && smartImage.items.length > 1
                ? currentLayout!.columns
                : 1;
        return count;
    }, [smartImage]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        setStartImage(getSmartImage(container, columns));
    }, [children, columns, gutterSize, breakpoints]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        if (smartImage && smartImage.items.length > 0) {
            const imgCollection = container.getElementsByTagName("img");

            if (!imgCollection) return;

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
                          ((columns - 1) * gutterSize) / columns
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
                                          ? acc + item + gutterSize
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
                                          ? acc + item[0] + gutterSize
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
    }, [width, smartImage, columns, gutterSize, children]);

    return (
        <Tag ref={containerRef} style={{ position: "relative" }}>
            {children}
        </Tag>
    );
};

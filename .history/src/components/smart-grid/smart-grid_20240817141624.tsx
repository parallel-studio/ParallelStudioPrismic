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

type SmartValues = {
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
const MINIMUM_COLUMNS = 1;

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

const getSmartValues = (
    container: HTMLDivElement,
    columns: number
): SmartValues => {
    const items: { width: number; height: number }[] = [];
    const children = container.childNodes;

    children.forEach((child) => {
        if (child.nodeName === "IMG") {
            const element = child as HTMLElement;
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

const createGrid = (
    container: HTMLDivElement,
    columns: number,
    gutterSize: number
): void => {
    if (!container) {
        return;
    }

    const children = container.childNodes;

    const width = Array.from(children)
        .slice(0, columns)
        .reduce((acc, item) => {
            if (item.nodeName === "IMG") {
                const element = item as HTMLElement;
                return acc + element.clientWidth;
            } else return acc;
        }, 0);

    const containerWidth = container.clientWidth;
    const initialRowWidth = width;
    const factor = containerWidth / initialRowWidth;

    let table: {
        column: number;
        row: number;
        width: number;
        height: number;
        x: number;
        y: number;
    }[] = [];

    children.forEach((child, index) => {
        if (child.nodeName === "IMG") {
            const element = child as HTMLImageElement;
            if (element) {
                const row = Math.floor(index / columns);
                const column = index % columns;
                const width =
                    row === 0
                        ? element.width * factor -
                          ((columns - 1) * gutterSize) / columns
                        : table[column].width;
                const height = (element.height * width) / element.width;
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

                const widthString = `${width}px`;
                const heightString = `${height}px`;

                element.setAttribute("width", widthString);
                element.setAttribute("height", heightString);
                element.style.position = "absolute";
                element.style.top = `${y}px`;
                element.style.left = `${x}px`;
                element.style.width = widthString;
                element.style.height = heightString;

                table.push({
                    column,
                    row,
                    width,
                    height,
                    x,
                    y,
                });
            }
        }
    });

    const containerHeight = Math.max(
        ...table.map((item) => item.height + item.y)
    );

    container.style.height = `${containerHeight}px`;
};

export const SmartGrid: FC<SmartGridProps<ElementType>> = ({
    as: Tag = "div",
    children,
    breakpoints = DEFAULT_BREAKPOINTS,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // const [smartValues, setSmartValues] = useState<SmartValues>();
    const { width } = useWindowSize();
    const { activeLayout } = useLayout();

    const currentBreakpoint = useMemo(
        () =>
            activeLayout === "tablet"
                ? DEFAULT_BREAKPOINT
                : activeLayout ?? DEFAULT_BREAKPOINT,
        [activeLayout]
    );

    const currentLayout = useMemo(
        () =>
            breakpoints[currentBreakpoint] ??
            DEFAULT_BREAKPOINTS[currentBreakpoint],
        [breakpoints, currentBreakpoint]
    );

    const gutterSize = useMemo(
        () => getSize(currentLayout!.gutter),
        [currentLayout]
    );

    const columns = useMemo(() => {
        const children = containerRef?.current?.childNodes;
        const count =
            children && children.length > 1
                ? Math.min(children.length, currentLayout!.columns)
                : MINIMUM_COLUMNS;

        return count;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, children, currentLayout]);

    // useEffect(() => {
    //     const container = containerRef.current;

    //     if (!container) {
    //         return;
    //     }

    //     setSmartValues(getSmartValues(container, columns));
    // }, [children, columns, gutterSize, breakpoints]);

    useEffect(() => {
        const container = containerRef.current;

        createGrid(container, columns, gutterSize);

        if (!container) {
            return;
        }

        createGrid(container, columns, gutterSize);
    }, [containerRef, width, columns, gutterSize, children, breakpoints]);

    return (
        <Tag ref={containerRef} style={{ position: "relative" }}>
            {children}
        </Tag>
    );
};

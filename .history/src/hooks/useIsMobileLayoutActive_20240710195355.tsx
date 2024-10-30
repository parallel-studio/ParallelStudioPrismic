"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

// const BREAKPOINT = 991;

export type Layout = "mobile" | "tablet";

type LayoutProps = number;

type Layouts = Record<Layout, LayoutProps>;

const LAYOUTS_DEFS: Layouts = {
    mobile: 991,
    tablet: 1080,
};

const LAYOUTS = Array.from(Object.entries(LAYOUTS_DEFS), (i) => {
    return { layout: i[0] as Layout, breakpoint: i[1] as LayoutProps };
});
const BREAKPOINT_ARRAY = LAYOUTS.map((item) => item.breakpoint);

type UseIsMobileLayoutProps = Layout;

const useActiveLayout = (initialLayout: UseIsMobileLayoutProps) => {
    const [activeLayout, setActiveLayout] = useState<Layout>(initialLayout);

    const initialBreakpoint = LAYOUTS_DEFS[initialLayout];

    const path = usePathname();

    const handleResize = useCallback(() => {
        const innerWidth = window.innerWidth;

        if (innerWidth > initialBreakpoint) {
            const distanceToBreakpoint = BREAKPOINT_ARRAY.map(
                (item) => innerWidth - item
            );
            const closestBreakpoint = Math.min(...distanceToBreakpoint);
            const index = distanceToBreakpoint.indexOf(closestBreakpoint);
            console.log(
                "innerwidth",
                innerWidth,
                "breakpointarray",
                BREAKPOINT_ARRAY,
                "distancetobreakpoint",
                distanceToBreakpoint,
                "closestbreakpoint",
                closestBreakpoint,
                "index",
                index,
                "layout",
                LAYOUTS[index].layout
            );
            setActiveLayout(LAYOUTS[index].layout);
        } else if (innerWidth < initialBreakpoint) {
            setActiveLayout(initialLayout);
        }
    }, []);

    useLayoutEffect(() => {
        handleResize();
    }, [path, handleResize]);

    useLayoutEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return { activeLayout };
};

export { useActiveLayout };

"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

export type Layout = "mobile" | "tablet" | "desktop";

type LayoutProps = number;

const LAYOUTS_DEFS: Record<Layout, LayoutProps> = {
    mobile: 768,
    tablet: 1024,
    desktop: 1920,
};

const LAYOUTS = Array.from(Object.entries(LAYOUTS_DEFS), (i) => {
    return { layout: i[0] as Layout, breakpoint: i[1] as LayoutProps };
});
const BREAKPOINT_ARRAY = LAYOUTS.map((item) => item.breakpoint);

const findClosestLayout = (innerWidth: number) => {
    let distanceToBreakpoint = LAYOUTS.map((layout) => {
        const breakpoint = layout.breakpoint;
        if (breakpoint < innerWidth) {
            return undefined;
        } else {
            return {
                layout: layout.layout,
                score: Math.pow(innerWidth - breakpoint, 2),
            };
        }
    });

    const filteredresults = distanceToBreakpoint.filter(
        (item) => item !== undefined
    );

    console.log(distanceToBreakpoint);

    const closestBreakpoint = distanceToBreakpoint.find((layout) =>
        Math.min(layout?.score as any)
    );
    const index = distanceToBreakpoint.indexOf(closestBreakpoint);

    console.log(LAYOUTS[index].layout);

    return LAYOUTS[index].layout;
};

type UseIsMobileLayoutProps = Layout;

const useActiveLayout = (initialLayout: UseIsMobileLayoutProps) => {
    const [activeLayout, setActiveLayout] = useState<Layout>(initialLayout);

    const path = usePathname();

    const handleResize = useCallback(() => {
        const innerWidth = window.innerWidth;
        if (innerWidth) {
            setActiveLayout(findClosestLayout(innerWidth));
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

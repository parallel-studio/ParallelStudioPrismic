"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

export type Layout = "mobile" | "tablet";

type LayoutProps = number;

const LAYOUTS_DEFS: Record<Layout, LayoutProps> = {
    mobile: 991,
    tablet: 1080,
};

const LAYOUTS = Array.from(Object.entries(LAYOUTS_DEFS), (i) => {
    return { layout: i[0] as Layout, breakpoint: i[1] as LayoutProps };
});
const BREAKPOINT_ARRAY = LAYOUTS.map((item) => item.breakpoint);

const findClosestLayout = (innerWidth: number) => {
    const distanceToBreakpoint = BREAKPOINT_ARRAY.map(
        (item) => (innerWidth - item) ^ 2
    );

    console.log("distanceToBreakpoint", distanceToBreakpoint);
    const closestBreakpoint = Math.min(...distanceToBreakpoint);
    const index = distanceToBreakpoint.indexOf(closestBreakpoint);
    return LAYOUTS[index].layout;
};

type UseIsMobileLayoutProps = Layout;

const useActiveLayout = (initialLayout: UseIsMobileLayoutProps) => {
    const [activeLayout, setActiveLayout] = useState<Layout>(initialLayout);

    const initialBreakpoint = LAYOUTS_DEFS[initialLayout];

    const path = usePathname();

    const handleResize = useCallback(() => {
        const innerWidth = window.innerWidth;
        const activeWidth = LAYOUTS_DEFS[activeLayout];

        if (innerWidth) {
            setActiveLayout(findClosestLayout(innerWidth));

            console.log("CLOSESTLAYOUT", findClosestLayout(innerWidth));
        }

        // if (innerWidth > activeWidth) {
        //     const distanceToBreakpoint = BREAKPOINT_ARRAY.map(
        //         (item) => innerWidth - item
        //     );
        //     const closestBreakpoint = Math.min(...distanceToBreakpoint);
        //     const index = distanceToBreakpoint.indexOf(closestBreakpoint);
        //     setActiveLayout(LAYOUTS[index].layout);
        // }
    }, [activeLayout]);

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

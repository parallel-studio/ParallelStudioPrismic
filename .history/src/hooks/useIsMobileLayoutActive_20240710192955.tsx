"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

// const BREAKPOINT = 991;

export type Layout = "mobile" | "tablet" | "big_screen";

type LayoutProps = {
    breakpoint: number;
};

type Layouts = Record<Layout, LayoutProps>;

const LAYOUTS_DEFS: Layouts = {
    mobile: { breakpoint: 991 },
    tablet: { breakpoint: 991},
    big_screen: { breakpoint: 991 },}


const LAYOUTS = Array.from(Object.entries(LAYOUTS_DEFS), (i) => i[1]);
const BREAKPOINT_ARRAY = LAYOUTS.map((item) => item.breakpoint);

type UseIsMobileLayoutProps = Layout;

const useActiveLayout = (initialLayout: UseIsMobileLayoutProps) => {
    const [activeLayout, setActiveLayout] = useState<Layout>(initialLayout);

    const breakpoint = LAYOUTS_DEFS[initialLayout].breakpoint;

    const path = usePathname();

    const handleResize = useCallback(() => {
        if (window.innerWidth > breakpoint) {
            LAYOUTS.find((item) => item.);
        } else if (window.innerWidth < breakpoint) {
            setActiveLayout(true);
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

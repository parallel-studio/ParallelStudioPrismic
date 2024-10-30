"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

// const BREAKPOINT = 991;

export type Layout = "mobile" | "tablet" | "big_screen";

type LayoutProps = {
    breakpoint: number;
    active: boolean;
};

type Layouts = Record<string, LayoutProps>;

const LAYOUTS: Layouts = {
    mobile: { breakpoint: 991, active: false },
    tablet: { breakpoint: 991, active: false },
    big_screen: { breakpoint: 991, active: false },
};

const LAYOUTS_ARRAY = Array.from(Object.entries(LAYOUTS), (i) => i[1]);

type UseIsMobileLayoutProps = Layout;

const useActiveLayout = (layout: UseIsMobileLayoutProps) => {
    const [activeLayout, setActiveLayout] = useState<Layout>(layout);

    const breakpoint = LAYOUTS[layout].breakpoint;

    const path = usePathname();

    const handleResize = useCallback(() => {
        if (window.innerWidth > breakpoint) {
            LAYOUTS_ARRAY.find((item) => item.);
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

"use client";

import { useCallback, useLayoutEffect, useState } from "react";

import { usePathname } from "next/navigation";

const BREAKPOINT = 991;

type Layout = "mobile" | "tablet" | "big_screen";

type Layouts = Record<Layout, number>;

const LAYOUTS: Layouts =  {
    mobile: 991,
    tablet: 
}

const useIsMobileLayoutActive = (active: boolean = true) => {
    const [isMobileLayoutActive, setMobileLayoutActive] =
        useState<boolean>(active);

    const path = usePathname();

    const handleResize = useCallback(() => {
        if (window.innerWidth > BREAKPOINT) {
            setMobileLayoutActive(false);
        } else if (window.innerWidth < BREAKPOINT) {
            setMobileLayoutActive(true);
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

    return { isMobileLayoutActive };
};

export { useIsMobileLayoutActive };

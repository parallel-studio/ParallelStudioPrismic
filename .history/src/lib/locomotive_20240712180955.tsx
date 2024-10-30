"use client";

import { ReactNode } from "react";

import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";

export const LocomotiveSmoothScroll = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    return (
        <LocomotiveScr
            root
            options={{
                lerp: 0.03,
                duration: 1.3,
                orientation: "vertical",
                ...options,
            }}
        >
            {children}
        </LocomotiveScr>
    );
};

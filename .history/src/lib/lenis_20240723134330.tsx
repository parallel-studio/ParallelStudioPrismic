"use client";

import { ReactNode } from "react";

import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.03,
                duration: 1.1,
                orientation: "vertical",
                wrapper: window,
                ...options,
            }}
        >
            {children}
        </ReactLenis>
    );
};

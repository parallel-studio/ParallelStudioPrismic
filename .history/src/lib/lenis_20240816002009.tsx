"use client";

import { ReactNode, useEffect, useRef } from "react";

import Lenis, { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import gsap from "gsap";

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
            autoRaf={false}
            options={{
                lerp: 0.03,
                duration: 1.1,
                orientation: "vertical",
                ...options,
            }}
        >
            {children}
        </ReactLenis>
    );
};

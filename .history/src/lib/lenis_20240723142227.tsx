"use client";

import { ReactNode } from "react";

import gsap from "gsap";
import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import Script from "next/script";

gsap.registerPlugin(ScrollSmoother);

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    return (
        // <ReactLenis
        //     root
        //     options={{
        //         lerp: 0.03,
        //         duration: 1.1,
        //         orientation: "vertical",
        //         ...options,
        //     }}
        // >
        //     {children}
        // </ReactLenis>
        <>
            <Script src="https://assets.codepen.io/16327/ScrollSmoother.min.js" />
            {children}
        </>
    );
};

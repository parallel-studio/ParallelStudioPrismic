"use client";

import { ReactNode, useEffect } from "react";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import Script from "next/script";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    // useEffect(() => {
    //     ScrollSmoother.create({
    //         smooth: 1,
    //         effects: true,
    //         content: window,
    //     });
    // }, []);

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
        <>{children}</>
    );
};

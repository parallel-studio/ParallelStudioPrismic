"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import Script from "next/script";

import useIsomorphicLayoutEffect from "./isomorphic-layout";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    useIsomorphicLayoutEffect(() => {
        ScrollSmoother.create({
            smooth: 2,
            effects: true,
        });
    }, []);

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
        <body id="smooth-wrapper">{children}</body>
    );
};

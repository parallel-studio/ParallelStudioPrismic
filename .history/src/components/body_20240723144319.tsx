"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import Script from "next/script";

import useIsomorphicLayoutEffect from "../lib/isomorphic-layout";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    const main = useRef(null);
    const smoother = useRef(null);

    useGSAP(
        () => {
            (smoother as any).current = ScrollSmoother.create({
                smooth: 2,
                effects: true,
                normalizeScroll: true,
            });
        },
        {
            scope: main,
        }
    );
    return (
        <body id="smooth-wrapper" ref={main}>
            <div id="smooth-content">{children}</div>
        </body>
    );
};

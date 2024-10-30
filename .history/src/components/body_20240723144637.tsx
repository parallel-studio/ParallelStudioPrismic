"use client";

import { ReactNode, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export const Body = ({ children }: { children: ReactNode }) => {
    const main = useRef(null);
    const smoother = useRef(null);

    useGSAP(
        () => {
            (smoother as any).current = ScrollSmoother.create({
                smooth: 1,
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

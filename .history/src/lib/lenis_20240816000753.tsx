"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";

import Lenis, { LenisOptions } from "lenis";
import ReactLenis from "lenis/react";
import Script from "next/script";
import gsap from "gsap";

export const LenisSmoothScrolling = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
}) => {
    const lenisRef = useRef<any>();

    useEffect(() => {
        function update(time: number) {
            (lenisRef.current?.lenis as Lenis)?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    });

    return (
        <ReactLenis
            ref={lenisRef}
            root
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

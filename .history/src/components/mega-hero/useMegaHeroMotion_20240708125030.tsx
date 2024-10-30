import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const { isMobileLayoutActive } = useLayout();
    const carouselRef = useRef<HTMLDivElement>(null);
    const path = usePathname();

    useEffect(() => {
        const initialBodyHeight = document.body.style.height;

        if (isMobileLayoutActive) return;

        const updateBodyHeight = () => {
            if (document) {
                const carousel_wrapper =
                    document.querySelector(".carousel_wrapper");
                document.body.style.height =
                    carousel_wrapper?.scrollWidth + "px";
            }
        };

        updateBodyHeight();

        window.addEventListener("resize", updateBodyHeight);

        return () => {
            window.removeEventListener("resize", updateBodyHeight);
            document.body.style.height = initialBodyHeight;
        };
    }, [path, isMobileLayoutActive]);

    useIsomorphicLayoutEffect(() => {
        const hoverElement = carouselRef.current;

        let scrollSpeed = 1; // Ajustez la vitesse ici (pixels par intervalle)
        let interval = 30; // Ajustez l'intervalle ici (en millisecondes)

        let scrollDirection = 1;
        let autoScrollInterval: ReturnType<typeof setInterval>;

        function autoScroll() {
            window.scrollBy({
                left: 0,
                top: scrollSpeed * scrollDirection,
                behavior: "instant",
            });
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(autoScroll, interval);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // let scrollAnimationFrame: number;
        // let prevtimeStamp = 0;
        // let deltaTime = 0;
        // let functionTiming = 10;
        // let counter = 0;
        // let reachedBottom = false;

        // function autoScroll(timestamp: number) {
        //     const deltaTime = timestamp - prevtimeStamp;
        //     prevtimeStamp = timestamp;
        //     const scrollY = window.scrollY;

        //     if (counter > functionTiming) {
        //         window.scrollBy(0, 1);
        //         counter = 0;

        //         if (scrollY === window.scrollY) reachedBottom = true;
        //     } else {
        //         counter += deltaTime;
        //     }

        //     if (reachedBottom) cancelAnimationFrame(scrollAnimationFrame);
        //     else scrollAnimationFrame = requestAnimationFrame(autoScroll);
        // }

        // function startAutoScroll() {
        //     if (!scrollAnimationFrame) autoScroll(0);
        // }

        // function stopAutoScroll() {
        //     if (scrollAnimationFrame)
        //         cancelAnimationFrame(scrollAnimationFrame);
        //     scrollAnimationFrame = 0;
        // }

        if (isMobileLayoutActive) {
            stopAutoScroll();
        }

        if (!isMobileLayoutActive) {
            startAutoScroll();
            hoverElement?.addEventListener("mousedown", stopAutoScroll);
            hoverElement?.addEventListener("mouseover", stopAutoScroll);
            hoverElement?.addEventListener("mouseleave", startAutoScroll);
        }

        return () => {
            hoverElement?.removeEventListener("mouseover", startAutoScroll);
            hoverElement?.removeEventListener("mouseleave", stopAutoScroll);
            hoverElement?.removeEventListener("mousedown", stopAutoScroll);
            stopAutoScroll();
            window.scrollTo(0, 0);
        };
    }, [carouselRef, isMobileLayoutActive, path]);

    return { carouselRef };
};

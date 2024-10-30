import { useEffect, useState } from "react";

import {
    useAnimate,
    useInView,
    useIsomorphicLayoutEffect,
} from "framer-motion";

import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const isInView = useInView(scope);
    const { isMobileLayoutActive } = useLayout();
    const carousel = scope.current;

    useIsomorphicLayoutEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = carousel?.scrollWidth + "px";
    }, [carousel, isMobileLayoutActive]);

    useEffect(() => {
        if (carousel && !isMobileLayoutActive) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && carousel) {
                    e.preventDefault();
                    carousel.scrollLeft += e.deltaY * 0.1;
                }
            };

            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isInView, carousel, isMobileLayoutActive]);

    useEffect(() => {
        const hoverElement = scope.current;

        if (hoverElement) {
            function startAutoScroll() {
                let scrollSpeed = 1; // Ajustez la vitesse ici (pixels par intervalle)
                let interval = 30; // Ajustez l'intervalle ici (en millisecondes)
                let scrollDirection = 1;
                let autoScrollInterval: ReturnType<typeof setInterval>;

                function autoScroll() {
                    window.scrollBy(0, scrollSpeed * scrollDirection);
                }

                autoScrollInterval = setInterval(autoScroll, interval);

                hoverElement.addEventListener("mouseover", function () {
                    clearInterval(autoScrollInterval);
                });

                hoverElement.addEventListener("mouseleave", function () {
                    autoScrollInterval = setInterval(autoScroll, interval);
                });

                return () => {
                    hoverElement.removeEventListener("mouseover", function () {
                        clearInterval(autoScrollInterval);
                    });

                    hoverElement.removeEventListener("mouseleave", function () {
                        autoScrollInterval = setInterval(autoScroll, interval);
                    });
                };
            }

            setTimeout(startAutoScroll, 2000);
        }
    }, [scope]);

    useIsomorphicLayoutEffect(() => {
        if (carousel) {
            animate(carousel, { opacity: 1 });
        }
    }, [carousel, isMobileLayoutActive, animate]);

    return { scope };
};

import { useEffect } from "react";

import { useAnimate, useIsomorphicLayoutEffect } from "framer-motion";
import { usePathname } from "next/navigation";

import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const path = usePathname();
    const { isMobileLayoutActive } = useLayout();
    const carousel = scope.current;

    useIsomorphicLayoutEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = carousel?.scrollWidth + "px";

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
    }, [carousel, path]);

    useEffect(() => {
        const hoverElement = scope.current;

        if (hoverElement) {
            let scrollSpeed = isMobileLayoutActive ? 1 : 1; // Ajustez la vitesse ici (pixels par intervalle)
            let interval = isMobileLayoutActive ? 5 : 40; // Ajustez l'intervalle ici (en millisecondes)
            let scrollDirection = 1;
            let autoScrollInterval: ReturnType<typeof setInterval>;

            function startAutoScroll() {
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

            function stopAutoScroll() {
                clearInterval(autoScrollInterval);
            }

            if (isMobileLayoutActive) {
                stopAutoScroll();
            }

            if (!isMobileLayoutActive) {
                setTimeout(startAutoScroll, 2000);

                hoverElement.addEventListener("mousedown", stopAutoScroll);
                return () => {
                    hoverElement.removeEventListener(
                        "mousedown",
                        stopAutoScroll
                    );
                    stopAutoScroll(); // Stop the scroll when the component is unmounted
                };
            }
        }
    }, [scope, isMobileLayoutActive, path]);

    useIsomorphicLayoutEffect(() => {
        if (carousel) {
            animate(carousel, { opacity: 1 });
        }
    }, [carousel, isMobileLayoutActive, animate, path]);

    return { scope };
};
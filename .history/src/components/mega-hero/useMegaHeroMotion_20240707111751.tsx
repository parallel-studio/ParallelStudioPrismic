import { useEffect, useRef } from "react";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const { isMobileLayoutActive } = useLayout();
    const carouselRef = useRef<HTMLDivElement>(null);
    const carousel = carouselRef.current;

    useEffect(() => {
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
        };
    }, []);

    useEffect(() => {
        const hoverElement = carousel;

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

                hoverElement?.addEventListener("mouseover", function () {
                    clearInterval(autoScrollInterval);
                });

                hoverElement?.addEventListener("mouseleave", function () {
                    autoScrollInterval = setInterval(autoScroll, interval);
                });

                return () => {
                    hoverElement?.removeEventListener("mouseover", function () {
                        clearInterval(autoScrollInterval);
                    });

                    hoverElement?.removeEventListener(
                        "mouseleave",
                        function () {
                            autoScrollInterval = setInterval(
                                autoScroll,
                                interval
                            );
                        }
                    );
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
    }, [carousel, isMobileLayoutActive]);

    return { carouselRef };
};

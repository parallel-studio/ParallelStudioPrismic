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
    const [hasAppeared, setHasAppeared] = useState(false);
    const carousel = scope.current;

    useIsomorphicLayoutEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = carousel?.scrollWidth + "px";
    }, [carousel]);

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

    // useEffect(() => {
    //     const carousel = container.current;
    //     const swiper = swiperRef.current;

    //     if (carousel && swiper && !isMobileLayoutActive) {
    //         const stopAnimation = () => {
    //             const translate = swiper.swiper?.getTranslate();
    //             swiper.swiper?.translateTo(translate, 0);
    //             swiper.swiper?.autoplay.pause();
    //         };

    //         carousel.addEventListener("mouseover", stopAnimation);

    //         return () => {
    //             carousel.removeEventListener("mouseover", stopAnimation);
    //         };
    //     }
    // }, [container, swiperRef, isMobileLayoutActive]);

    useEffect(() => {
        function startAutoScroll() {
            let scrollSpeed = 1; // Ajustez la vitesse ici (pixels par intervalle)
            let interval = 30; // Ajustez l'intervalle ici (en millisecondes)
            let scrollDirection = 1;
            let autoScrollInterval: ReturnType<typeof setInterval>;

            function autoScroll() {
                window.scrollBy(0, scrollSpeed * scrollDirection);
            }

            autoScrollInterval = setInterval(autoScroll, interval);

            const hoverElement = scope.current;
            hoverElement.addEventListener("mouseenter", function () {
                clearInterval(autoScrollInterval);
            });

            // Reprendre le défilement automatique quand la souris quitte
            hoverElement.addEventListener("mouseleave", function () {
                autoScrollInterval = setInterval(autoScroll, interval);
            });

            return () => {
                hoverElement.removeEventListener("mouseenter", function () {
                    clearInterval(autoScrollInterval);
                });

                hoverElement.removeEventListener("mouseleave", function () {
                    autoScrollInterval = setInterval(autoScroll, interval);
                });
            };
        }

        setTimeout(startAutoScroll, 2000);
    }, [scope]);

    useIsomorphicLayoutEffect(() => {
        if (carousel) {
            animate(carousel, { opacity: 1 });
        }
    }, [carousel, isMobileLayoutActive, animate]);

    return { scope };
};

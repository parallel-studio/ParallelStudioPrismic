import { RefObject, useCallback, useEffect, useState } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHeroNew = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const [translateX, setTranslateX] = useState(0);

    const animationStarts = useCallback(() => {
        const carousel = container.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            gsap.to(carousel, {
                translateX: -150,
                duration: totalScrollLength / 100,
                ease: "none",
                onComplete: () => {
                    setTimeout(() => {
                        animationStarts();
                    }, 5000);
                },
            });
        }
    }, [container]);

    const animationStops = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            gsap.killTweensOf(carousel);
        }
    }, [container]);

    const handleManualScroll = useCallback(
        (e: WheelEvent) => {
            const carousel = container.current;
            animationStops();
            setTranslateX((prev) => {
                if (!carousel) return prev;
                const maxTranslateX =
                    -carousel.scrollWidth + carousel.offsetWidth;
                const newTranslateX = prev + e.deltaY * 0.5;
                return Math.min(Math.max(newTranslateX, maxTranslateX), 0);
            });
        },
        [container, animationStops]
    );

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;
        if (carousel) {
            window.addEventListener("wheel", handleManualScroll, {
                passive: false,
            });
            return () => {
                window.removeEventListener("wheel", handleManualScroll);
            };
        }
    }, [isInView, container, handleManualScroll]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;
        if (carousel) {
            const carouselItems = carousel.querySelectorAll(".carousel_item");
            Array.from(carouselItems).forEach((child: Element) => {
                (child as HTMLElement).style.transform =
                    `translateX(${translateX}px)`;
            });
        }
    }, [translateX]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;

        if (carousel) {
            // setTimeout(animationStarts, 1500);

            animationStarts();

            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            return () => {
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                // animationStops();
            };
        }
    }, [container, animationStarts, animationStops]);
};

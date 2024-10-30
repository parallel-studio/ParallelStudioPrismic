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
    const [animationActive, setAnimationActive] = useState(false);

    const animationStarts = useCallback(() => {
        const carousel = container.current;

        if (!animationActive && carousel) {
            setAnimationActive(true);
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            gsap.to(carousel, {
                translateX: -150, // Adjust as needed
                duration: totalScrollLength / 100, // Adjust your duration as needed
                ease: "none",
                onComplete: () => {
                    setTimeout(() => {
                        setAnimationActive(false);
                        animationStarts(); // Restart animation unless stopped
                    }, 1000);
                },
            });
        }
    }, [animationActive, setAnimationActive, container]);

    const animationStops = useCallback(() => {
        const carousel = container.current;
        if (animationActive) {
            gsap.killTweensOf(carousel);
            setAnimationActive(false);
        }
    }, [animationActive, setAnimationActive, container]);

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

    // useIsomorphicLayoutEffect(() => {
    //     const carousel = container.current;
    //     if (carousel) {
    //         window.addEventListener("wheel", handleManualScroll, {
    //             passive: false,
    //         });
    //         return () => {
    //             window.removeEventListener("wheel", handleManualScroll);
    //         };
    //     }
    // }, [isInView, container, handleManualScroll]);

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
            setTimeout(animationStarts, 1500);

            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            return () => {
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                animationStops();
            };
        }
    }, [container, animationStarts, animationStops, handleManualScroll]);
};

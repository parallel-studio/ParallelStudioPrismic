import { RefObject, useCallback, useEffect, useState } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap, { toArray } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHeroNew = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const [translateX, setTranslateX] = useState(0);

    const fadeIn = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            setTimeout(() => {
                gsap.to(carousel, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                });
            }, 1000);
        }
    }, [container]);

    const autoScrollStarts = useCallback(() => {
        const carousel = container.current;

        if (carousel) {
            const carouselItems = gsap.("carousel_item");

            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            gsap.to(carouselItems, {
                translateX: -150,
                duration: totalScrollLength / 100,
                ease: "none",
                onComplete: () => {
                    setTimeout(() => {
                        autoScrollStarts();
                    }, 5000);
                },
            });
        }
    }, [container]);

    const autoScrollStops = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            gsap.killTweensOf(carousel);
        }
    }, [container]);

    const handleManualScroll = useCallback(
        (e: WheelEvent) => {
            const carousel = container.current;
            autoScrollStops();
            setTranslateX((prev) => {
                if (!carousel) return prev;
                const maxTranslateX =
                    -carousel.scrollWidth + carousel.offsetWidth;
                const newTranslateX = prev - e.deltaY * 0.5;
                return Math.min(Math.max(newTranslateX, maxTranslateX), 0);
            });
        },
        [container, autoScrollStops]
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
            fadeIn();
            setTimeout(autoScrollStarts, 1500);

            carousel.addEventListener("mouseenter", autoScrollStops);
            carousel.addEventListener("mouseleave", autoScrollStarts);

            return () => {
                carousel.removeEventListener("mouseenter", autoScrollStops);
                carousel.removeEventListener("mouseleave", autoScrollStarts);
                autoScrollStops();
            };
        }
    }, [container, autoScrollStarts, autoScrollStops, fadeIn]);
};

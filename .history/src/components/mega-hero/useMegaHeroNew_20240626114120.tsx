import {
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

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
    const [translateX, setTranslateX] = useState(0); // State to track total translation

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            const carousel = container.current;
            setTranslateX((prev) => {
                if (!carousel) return prev;
                const maxTranslateX =
                    -carousel.scrollWidth + carousel.offsetWidth;
                const newTranslateX = prev + e.deltaY;
                return Math.min(Math.max(newTranslateX, maxTranslateX), 0);
            });
        },
        [container]
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
            window.addEventListener("wheel", handleScroll, { passive: false });
            return () => {
                window.removeEventListener("wheel", handleScroll);
            };
        }
    }, [isInView, container, handleScroll]);

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
            let animationActive = false;

            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            const animationStarts = () => {
                if (!animationActive) {
                    animationActive = true;
                    gsap.to(carousel, {
                        translateX: -150, // Adjust as needed
                        duration: totalScrollLength / 100, // Adjust your duration as needed
                        ease: "none",
                        onComplete: () => {
                            setTimeout(() => {
                                animationActive = false;
                                animationStarts(); // Restart animation unless stopped
                            }, 1000);
                        },
                    });
                }
            };

            const animationStops = () => {
                if (animationActive) {
                    gsap.killTweensOf(carousel);
                    animationActive = false;
                }
            };

            const handleScroll = (e) => {
                if (e.deltaY) animationStops(); // Stop animation on scroll input
            };

            // Add event listeners
            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);
            carousel.addEventListener("wheel", handleScroll);

            // Initial start after delay
            setTimeout(animationStarts, 1500);

            // Cleanup function
            return () => {
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                carousel.removeEventListener("wheel", handleScroll);
                animationStops(); // Ensure animation is stopped
            };
        }
    }, [container]); //
};

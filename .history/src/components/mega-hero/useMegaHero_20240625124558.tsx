import { RefObject, useEffect } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHero = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useIsomorphicLayoutEffect(() => {
        const sectionPin = container.current;
        if (sectionPin) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && sectionPin) {
                    sectionPin.scrollLeft += e.deltaY * 0.65;
                }
            };

            // Add the event listener with options to be able to call preventDefault
            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isInView, container]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            let autoKill = false;

            setTimeout(() => {
                gsap.to(container.current, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                });
                autoKill = true;
            }, 1000);

            const animationStarts = () => {
                gsap.to(carousel, {
                    scrollTo: {
                        x: carousel.scrollWidth + 300,
                        autoKill,
                        onAutoKill: () => setTimeout(animationStarts, 1000),
                    },
                    duration: totalScrollLength / 10,
                    ease: "none",
                    onComplete: () => {
                        setTimeout(animationStarts, 1000);
                    },
                });
            };

            const animationStops = () => {
                gsap.killTweensOf(carousel);
            };

            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            setTimeout(animationStarts, 1500);

            return () => {
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                animationStops();
            };
        }
    }, [container]);
};

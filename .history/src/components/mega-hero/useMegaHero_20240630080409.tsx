import { RefObject, useEffect, useState } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHero = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const { isMobileLayoutActive } = useLayout();
    const [hasAppeared, setHasAppeared] = useState(false);

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;
        if (carousel && !isMobileLayoutActive) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && carousel) {
                    carousel.scrollLeft += e.deltaY * 0.4;
                }
            };

            // Add the event listener with options to be able to call preventDefault
            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isInView, container, isMobileLayoutActive]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            let autoKill = false;

            // setTimeout(() => {
            //     gsap.to(container.current, {
            //         opacity: 1,
            //         duration: 1,
            //         ease: "power2.inOut",
            //         onComplete: () => setHasAppeared(true),
            //     });
            //     autoKill = true;
            // }, 1000);

            gsap.to(container.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    setHasAppeared(true);
                    autoKill = true;
                },
            });

            if (!isMobileLayoutActive && hasAppeared) {
                const animationStarts = () => {
                    gsap.to(carousel, {
                        scrollTo: {
                            x: carousel.scrollWidth + 300,
                            autoKill,
                            onAutoKill: () => setTimeout(animationStarts, 1000),
                        },
                        duration: totalScrollLength / 6,
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

            return () => {
                gsap.killTweensOf(carousel);
            };
        }
    }, [container, isMobileLayoutActive, hasAppeared]);
};

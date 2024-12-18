import { ReactElement, RefObject, useEffect, useState } from "react";

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
            const handleWheel = (e: WheelEvent) => {
                if (isInView && carousel) {
                    setTranslateX((prev) => {
                        const maxTranslateX =
                            -carousel.scrollWidth + carousel.offsetWidth; // Calculate the maximum negative translateX value
                        const newTranslateX = prev + e.deltaY; // Calculate the new translateX value based on deltaY
                        return Math.min(
                            Math.max(newTranslateX, maxTranslateX),
                            0
                        );
                    }); // Cl;
                }
            };

            // Add the event listener with options to be able to call preventDefault
            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isInView, container]);

    // useIsomorphicLayoutEffect(() => {
    //     const carousel = container.current;

    //     if (carousel) {
    //         const totalScrollLength =
    //             carousel.scrollWidth - carousel.clientWidth;

    //         let autoKill = false;

    //         setTimeout(() => {
    //             gsap.to(container.current, {
    //                 opacity: 1,
    //                 duration: 1,
    //                 ease: "power2.inOut",
    //             });
    //             autoKill = true;
    //         }, 1000);

    //         const animationStarts = () => {
    //             gsap.to(carousel, {
    //                 // scrollTo: {
    //                 //     x: carousel.scrollWidth + 300,
    //                 //     autoKill,
    //                 //     onAutoKill: () => setTimeout(animationStarts, 1000),
    //                 // },
    //                 translateX: -150,
    //                 duration: totalScrollLength / 10,
    //                 ease: "none",
    //                 onComplete: () => {
    //                     setTimeout(animationStarts, 1000);
    //                 },
    //             });
    //         };

    //         const animationStops = () => {
    //             gsap.killTweensOf(carousel);
    //         };

    //         carousel.addEventListener("mouseenter", animationStops);
    //         carousel.addEventListener("mouseleave", animationStarts);

    //         setTimeout(animationStarts, 1500);

    //         return () => {
    //             carousel.removeEventListener("mouseenter", animationStops);
    //             carousel.removeEventListener("mouseleave", animationStarts);
    //             animationStops();
    //         };
    //     }
    // }, [container]);

    useIsomorphicLayoutEffect(() => {
        if (container && container.current) {
            const carousel = container.current;
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

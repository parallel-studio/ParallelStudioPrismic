import {
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useState,
} from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { useLayout } from "@/lib/mobile-layout";

import { useMegaHeroApi } from "./context";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHero = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const { isMobileLayoutActive } = useLayout();
    const [hasAppeared, setHasAppeared] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const { setIsReady } = useMegaHeroApi();

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useEffect(() => {
        const carousel = container.current;
        if (carousel) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && carousel) {
                    carousel.scrollLeft += e.deltaY * 0.4;
                }
            };

            // let startX: number, startY: number, scrollStartX: number;

            // const handleTouchStart = (e: TouchEvent) => {
            //     startX = e.touches[0].pageX;
            //     startY = e.touches[0].pageY;
            //     scrollStartX = window.scrollX;
            // };

            // const handleTouchMove = (e: TouchEvent) => {
            //     const deltaX = e.touches[0].pageX - startX;
            //     const deltaY = e.touches[0].pageY - startY;
            //     // Check if horizontal movement is greater than vertical movement
            //     if (Math.abs(deltaY) > Math.abs(deltaX)) {
            //         e.preventDefault(); // Prevent vertical scrolling
            //         carousel.scrollLeft -= deltaY * 0.1; // Apply horizontal scroll

            //         // e.preventDefault(); // Prevent vertical scrolling
            //         // // Instead of directly manipulating scrollLeft, use GSAP to animate
            //         // gsap.to(carousel, {
            //         //     // or your specific scrollable element
            //         //     scrollTo: { x: scrollStartX - deltaY, autoKill: true },
            //         //     onAutoKill: () => setTimeout(handleTouchMove, 300),
            //         //     duration: 0.5, // Adjust duration for inertia effect
            //         //     ease: "power3.out", // This easing gives a "deceleration" feel
            //         // });
            //     }
            // };

            let startX: number,
                startY: number,
                scrollStartX: number,
                lastX: number,
                lastTime: number,
                isScrolling: boolean;

            const applyMomentum = (speed: number, element: HTMLElement) => {
                let currentSpeed = speed * 45; // Increased initial speed multiplier for responsiveness
                const decelerationRate = 0.92; // Adjusted deceleration rate for smoother scrolling

                const decelerate = () => {
                    element.scrollLeft -= currentSpeed;
                    currentSpeed *= decelerationRate; // Apply deceleration

                    if (Math.abs(currentSpeed) > 0.1) {
                        // Lower threshold for ending the scroll
                        requestAnimationFrame(decelerate);
                    } else {
                        isScrolling = false; // Stop scrolling
                    }
                };

                decelerate();
            };

            const handleTouchStart = (e: TouchEvent) => {
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                lastX = startX; // Track the last X position
                lastTime = Date.now(); // Track the time to calculate speed
                isScrolling = false; // Flag to track if scrolling is happening
            };

            const handleTouchMove = (e: TouchEvent) => {
                const deltaX = e.touches[0].pageX - startX;
                const deltaY = e.touches[0].pageY - startY;
                const newTime = Date.now();
                const deltaTime = newTime - lastTime;
                const speedX = (e.touches[0].pageX - lastX) / deltaTime; // Calculate horizontal speed

                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    e.preventDefault(); // Prevent vertical scrolling
                    if (!isScrolling) {
                        isScrolling = true; // Start scrolling
                        applyMomentum(speedX, carousel);
                    }
                }

                lastX = e.touches[0].pageX; // Update the last X position
                lastTime = newTime; // Update the last time
            };

            window.addEventListener("wheel", handleWheel, { passive: false });
            window.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchmove", handleTouchMove, {
                passive: false,
            });

            return () => {
                window.removeEventListener("wheel", handleWheel);
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
            };
        }
    }, [isInView, container, isMobileLayoutActive]);

    const animationStarts = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;
            gsap.to(carousel, {
                scrollTo: {
                    x: carousel.scrollWidth + 300,
                    autoKill: true,
                    onAutoKill: () => setTimeout(animationStarts, 1000),
                },
                duration: totalScrollLength / 6,
                ease: "none",
                onComplete: () => {
                    setTimeout(animationStarts, 1000);
                },
            });
        }
    }, [container]);

    const animationStops = useCallback(() => {
        const carousel = container.current;
        if (carousel) gsap.killTweensOf(carousel);
    }, [container]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;

        if (carousel) {
            setTimeout(() => {
                gsap.to(container.current, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setHasAppeared(true);
                    },
                });
            }, 1000);

            if (!isMobileLayoutActive && hasAppeared) {
                carousel.addEventListener("mouseover", () =>
                    setIsHovering(true)
                );
                carousel.addEventListener("mouseleave", () =>
                    setIsHovering(false)
                );

                animationStarts();

                return () => {
                    carousel.removeEventListener("mouseover", () =>
                        setIsHovering(true)
                    );
                    carousel.removeEventListener("mouseleave", () =>
                        setIsHovering(false)
                    );
                    animationStops();
                };
            }

            return () => {
                gsap.killTweensOf(carousel);
            };
        }
    }, [container, isMobileLayoutActive, hasAppeared]);

    useEffect(() => {
        if (isHovering) {
            animationStops();
        } else if (hasAppeared && !isMobileLayoutActive) {
            animationStarts();
        }
    }, [
        isHovering,
        hasAppeared,
        animationStarts,
        animationStops,
        isMobileLayoutActive,
    ]);

    useIsomorphicLayoutEffect(() => {
        if (hasAppeared) {
            setIsReady(true);
        }
    }, [hasAppeared, setIsReady]);
};

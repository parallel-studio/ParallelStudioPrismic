import { RefObject, useEffect } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

type UseMegaHeroProps = {
    sectionPinRef: RefObject<HTMLElement>;
    sectionToPinRef: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHero = ({
    sectionPinRef,
    sectionToPinRef,
}: UseMegaHeroProps) => {
    const isInView = useInView(sectionPinRef);

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useIsomorphicLayoutEffect(() => {
        const sectionPin = sectionPinRef.current;
        const sectionToPin = sectionToPinRef.current;

        // const lenis = new Lenis({
        //     lerp: 0.1,
        //     smoothWheel: true,
        // });

        // function animate() {
        //     lenis.on("scroll", ScrollTrigger.update);

        //     gsap.ticker.add((time) => {
        //         lenis.raf(time * 1000);
        //     });

        //     gsap.ticker.lagSmoothing(0);
        // }

        if (sectionPin) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && sectionPin) {
                    sectionPin.scrollLeft += e.deltaY * 0.5;
                }
            };

            // Add the event listener with options to be able to call preventDefault
            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };

            // const context = gsap.context(() => {
            //     // lenis.on("scroll", animate);
            //     // animate();
            //     // Complete the GSAP animation configuration
            //     const slides = gsap.utils.toArray(".panel");

            //     gsap.to(slides, {
            //         opacity: 1,
            //         duration: 1,
            //         ease: "power2.inOut",
            //         x: () =>
            //             -(
            //                 sectionPin.scrollWidth -
            //                 document.documentElement.clientWidth
            //             ) + "px",
            //         scrollTrigger: {
            //             trigger: sectionPin,
            //             start: 0,
            //             end: () => "+=" + sectionPin.offsetWidth,
            //             scrub: true,
            //             markers: true,
            //             invalidateOnRefresh: true,
            //         },
            //     });
            // }, sectionPin);

            // return () => context.revert();
        }
    }, [isInView, sectionPinRef, sectionToPinRef]);

    useEffect(() => {
        const carousel = sectionPinRef.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            let autoKill = false;

            setTimeout(() => {
                gsap.to(sectionPinRef.current, {
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
                // carousel.removeEventListener("scroll", animationStops);
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                animationStops(); // Ensure to kill the animation when the component unmounts
            };
        }
    }, [sectionPinRef, sectionToPinRef]);
};
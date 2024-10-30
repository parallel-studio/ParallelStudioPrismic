import { RefObject, useEffect } from "react";

import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";

type UseMegaHeroProps = {
    sectionPinRef: RefObject<HTMLElement>;
    sectionToPinRef: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin);

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

    useEffect(() => {
        const sectionPin = sectionPinRef.current;
        const sectionToPin = sectionToPinRef.current;

        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        function animate() {
            lenis.on("scroll", ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }

        // if (sectionPin) {
        //     lenis.on("scroll", animate);
        //     animate();
        //     // Complete the GSAP animation configuration
        //     const containerAnimation = gsap.to(sectionPin, {
        //         opacity: 1,
        //         duration: 1,
        //         ease: "power2.inOut",
        //         x: () =>
        //             sectionPin.scrollWidth -
        //             document.documentElement.clientWidth +
        //             "px",
        //         scrollTrigger: {
        //             trigger: sectionToPin,
        //             start: "top top",
        //             end: () => "+=" + sectionPin.offsetWidth,
        //             pin: true,
        //             scrub: true,
        //             invalidateOnRefresh: true, // Ensure measurements are recalculated on resize
        //         },
        //     });

        //     // Cleanup function to kill GSAP animation and ScrollTrigger instance
        //     return () => {
        //         containerAnimation.kill();
        //         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        //     };

        // }

        if (sectionPin) {
            // Setup ScrollTrigger
            const trigger = ScrollTrigger.create({
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                    // Calculate the horizontal scroll position based on vertical scroll progress
                    const maxScroll =
                        sectionPin.scrollWidth - window.innerWidth;
                    const scrollPos = self.progress * maxScroll;

                    // Apply the horizontal scroll
                    gsap.to(sectionPin, { x: -scrollPos, ease: "none" });
                },
            });

            // Cleanup function to kill ScrollTrigger instance
            return () => trigger.kill();
        }
    }, [isInView, sectionPinRef, sectionToPinRef]);

    // useEffect(() => {
    //     const carousel = sectionPinRef.current;

    //     if (carousel) {
    //         const totalScrollLength =
    //             carousel.scrollWidth - carousel.clientWidth;

    //         let autoKill = false;

    //         setTimeout(() => {
    //             gsap.to(sectionPinRef.current, {
    //                 opacity: 1,
    //                 duration: 1,
    //                 ease: "power2.inOut",
    //             });
    //             autoKill = true;
    //         }, 1000);

    //         const animationStarts = () => {
    //             gsap.to(carousel, {
    //                 scrollTo: {
    //                     x: carousel.scrollWidth + 300,
    //                     autoKill,
    //                     onAutoKill: () => setTimeout(animationStarts, 1000),
    //                 },
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

    //         // carousel.addEventListener("mouseenter", animationStops);
    //         // carousel.addEventListener("mouseleave", animationStarts);

    //         // setTimeout(animationStarts, 1500);

    //         return () => {
    //             // carousel.removeEventListener("scroll", animationStops);
    //             carousel.removeEventListener("mouseenter", animationStops);
    //             carousel.removeEventListener("mouseleave", animationStarts);
    //             animationStops(); // Ensure to kill the animation when the component unmounts
    //         };
    //     }
    // }, [sectionPinRef, sectionToPinRef]);
};

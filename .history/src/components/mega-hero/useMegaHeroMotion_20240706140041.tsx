import { RefObject, useEffect, useState } from "react";

import {
    useAnimate,
    useInView,
    useIsomorphicLayoutEffect,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {
    container?: RefObject<HTMLElement>;
    swiperRef?: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHeroMotion = ({
    container,
    swiperRef,
}: UseMegaHeroProps) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const isInView = useInView(scope);
    const { isMobileLayoutActive } = useLayout();
    const [hasAppeared, setHasAppeared] = useState(false);
    const carousel = scope.current;

    useIsomorphicLayoutEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = carousel?.scrollWidth + "px";
    }, [carousel]);

    useEffect(() => {
        if (carousel && !isMobileLayoutActive) {
            const handleWheel = (e: WheelEvent) => {
                if (isInView && carousel) {
                    e.preventDefault();
                    carousel.scrollLeft += e.deltaY * 0.1;
                }
            };

            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isInView, carousel, isMobileLayoutActive]);

    // useEffect(() => {
    //     const carousel = container.current;
    //     const swiper = swiperRef.current;

    //     if (carousel && swiper && !isMobileLayoutActive) {
    //         const stopAnimation = () => {
    //             const translate = swiper.swiper?.getTranslate();
    //             swiper.swiper?.translateTo(translate, 0);
    //             swiper.swiper?.autoplay.pause();
    //         };

    //         carousel.addEventListener("mouseover", stopAnimation);

    //         return () => {
    //             carousel.removeEventListener("mouseover", stopAnimation);
    //         };
    //     }
    // }, [container, swiperRef, isMobileLayoutActive]);

    useIsomorphicLayoutEffect(() => {
        if (carousel) {
            animate(carousel, { opacity: 1 });
            // setTimeout(() => {
            //     gsap.to(carousel, {
            //         opacity: 1,
            //         duration: 1,
            //         ease: "power2.inOut",
            //         onComplete: () => {
            //             setHasAppeared(true);
            //         },
            //     });
            // }, 1000);

            // return () => {
            //     gsap.killTweensOf(carousel);
            // };
        }
    }, [carousel, isMobileLayoutActive, hasAppeared, animate]);

    return { scope };
};

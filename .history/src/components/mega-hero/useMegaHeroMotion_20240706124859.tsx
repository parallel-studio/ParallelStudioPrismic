import { RefObject, useEffect, useState } from "react";

import {
    easeInOut,
    MotionValue,
    useAnimate,
    useInView,
    useIsomorphicLayoutEffect,
    useScroll,
    useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { useLayout } from "@/lib/mobile-layout";

function useSlide(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [0, -distance], {
        ease: easeInOut,
    });
}

type UseMegaHeroProps = {
    container?: RefObject<HTMLElement>;
    swiperRef?: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHeroMotion = ({
    container,
    swiperRef,
}: UseMegaHeroProps) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    const { isMobileLayoutActive } = useLayout();
    const [hasAppeared, setHasAppeared] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const carousel = scope.current;
        if (isInView && scope) {
            document.body.style.overflow = "hidden";
            document.body.style.height = carousel?.scrollWidth + "px";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        }
    }, [isInView, scope]);

    useEffect(() => {
        const carousel = scope.current;
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
    }, [isInView, scope, isMobileLayoutActive]);

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
        const carousel = scope.current;

        if (carousel) {
            setTimeout(() => {
                gsap.to(scope.current, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setHasAppeared(true);
                    },
                });
            }, 1000);

            return () => {
                gsap.killTweensOf(carousel);
            };
        }
    }, [container, isMobileLayoutActive, hasAppeared]);

    return { scope };
};

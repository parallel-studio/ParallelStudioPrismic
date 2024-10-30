import { RefObject, useEffect, useState } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SwiperRef } from "swiper/react";

import { useLayout } from "@/lib/mobile-layout";

import { useMegaHeroApi } from "./context";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
    swiperRef: RefObject<SwiperRef>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const useMegaHeroSwiper = ({
    container,
    swiperRef,
}: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const { isMobileLayoutActive } = useLayout();
    const [hasAppeared, setHasAppeared] = useState(false);
    const { setIsReady } = useMegaHeroApi();

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    // useEffect(() => {
    //     const carousel = container.current;
    //     if (carousel && !isMobileLayoutActive) {
    //         const handleWheel = (e: WheelEvent) => {
    //             if (isInView && carousel) {
    //                 e.preventDefault();
    //                 // carousel.scrollLeft += e.deltaY / 1000;
    //             }
    //         };

    //         window.addEventListener("wheel", handleWheel, { passive: false });

    //         return () => {
    //             window.removeEventListener("wheel", handleWheel);
    //         };
    //     }
    // }, [isInView, container, isMobileLayoutActive]);

    useEffect(() => {
        const carousel = container.current;
        const swiper = swiperRef.current;

        if (carousel && swiper && !isMobileLayoutActive) {
            const stopAnimation = () => {
                const translate = swiper.swiper?.getTranslate();
                swiper.swiper?.translateTo(translate, 0);
                swiper.swiper?.autoplay.pause();
            };

            carousel.addEventListener("mouseover", stopAnimation);

            return () => {
                carousel.removeEventListener("mouseover", stopAnimation);
            };
        }
    }, [container, swiperRef, isMobileLayoutActive]);

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

            return () => {
                gsap.killTweensOf(carousel);
            };
        }
    }, [container, isMobileLayoutActive, hasAppeared]);

    useIsomorphicLayoutEffect(() => {
        if (hasAppeared) {
            setIsReady(true);
        }
    }, [hasAppeared, setIsReady]);
};

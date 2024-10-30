"use client";

import { FC, ReactNode, useEffect, useRef } from "react";

import clsx from "clsx";
import {
    cubicBezier,
    easeInOut,
    MotionValue,
    useAnimate,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { motion } from "framer-motion";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";
import { useMegaHeroSwiper } from "./useMegaHeroSwiper";

import "swiper/scss";

function useSlide(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 500], [0, -distance], {
        ease: easeInOut,
    });
}

type MegaHeroCarouselProps = {
    placeholder: ReactNode;
    items?: ItemWithMuxData[];
};

export const MegaHeroCarouselMotion: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
}) => {
    const carousel = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<HTMLDivElement>(null);
    useMegaHeroMotion({ container: carousel, swiperRef });
    const { isMobileLayoutActive } = useLayout();
    const [scope, animate] = useAnimate();
    const { scrollY } = useScroll();
    const x = useSlide(scrollY, 1000);

    useEffect(() => {
        console.log(scope);
        if (scope?.current) {
            const item = scope.current.querySelector(".carousel_item");
            animate(scope.current, { scrollX: -x }, { ease: "linear" });
        }
    }, [scope, animate, x]);

    return (
        <div
            className={clsx(
                styles.carousel,
                isMobileLayoutActive
                    ? styles.carousel_mobile
                    : styles.carousel_desktop
            )}
            ref={carousel}
        >
            {!isMobileLayoutActive && (
                <div ref={scope} className={clsx(styles.carousel_wrapper)}>
                    {items?.map((item, index) => (
                        <MegaHeroItemClient key={index} item={item} />
                    ))}
                    {placeholder}
                </div>
            )}
            {isMobileLayoutActive && (
                <>
                    {items?.map((item, index) => (
                        <MegaHeroItemClient
                            key={index}
                            item={item}
                            variant="mobile"
                        />
                    ))}
                    {placeholder}
                </>
            )}
        </div>
    );
};
"use client";

import { FC, ReactNode, useEffect, useRef } from "react";

import clsx from "clsx";
import {
    cubicBezier,
    easeInOut,
    MotionValue,
    scroll,
    useAnimate,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { motion } from "framer-motion";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";
import { useMegaHeroSwiper } from "./useMegaHeroSwiper";

import "swiper/scss";

function useSlide(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [0, -distance], {
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
    const { scrollYProgress } = useScroll();

    useIsomorphicLayoutEffect(() => {
        console.log(scope);
        if (scope?.current) {
            animate(
                scope.current.children,
                { x: -scrollYProgress * 1000 },
                { ease: "linear" }
            );
        }
    }, [scope, animate, scrollYProgress]);

    const test = useSlide(scrollYProgress, 500);

    useEffect(() => {
        console.log("TEST", test);
    }, [test]);

    return (
        <div
            className={clsx(
                styles.carousel,
                isMobileLayoutActive
                    ? styles.carousel_mobile
                    : styles.carousel_desktop
            )}
        >
            <motion.div
                style={{ x: test }}
                className={clsx(styles.carousel_wrapper)}
                ref={scope}
            >
                {items?.map((item, index) => (
                    <MegaHeroItemClient key={index} item={item} />
                ))}
                {placeholder}
            </motion.div>
            {/* {!isMobileLayoutActive && (
                <div className={clsx(styles.carousel_wrapper)} ref={scope}>
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
            )} */}
        </div>
    );
};

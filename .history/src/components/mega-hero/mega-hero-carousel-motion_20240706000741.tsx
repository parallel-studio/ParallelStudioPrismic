"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";
import { useScroll } from "framer-motion";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroSwiper } from "./useMegaHeroSwiper";

import "swiper/scss";

type MegaHeroCarouselProps = {
    placeholder: ReactNode;
    items?: ItemWithMuxData[];
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
}) => {
    const carousel = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<HTMLDivElement>(null);
    // useMegaHeroSwiper({ container: carousel, swiperRef });
    const { isMobileLayoutActive } = useLayout();
    const { scrollY } = useScroll();

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
                <div ref={swiperRef} className={clsx(styles.carousel_wrapper)}>
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

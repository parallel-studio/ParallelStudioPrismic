"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import {
    A11y,
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./mega-hero.module.scss";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
}) => {
    const carousel = useRef<HTMLDivElement>(null);

    // useMegaHeroSwiper({ container: carousel });

    // const swiper = useMemo(() => new Swiper(".swiper", { autoplay: true }), []);

    // useEffect(() => {
    //     console.log("swiper", swiper);
    // }, [swiper]);

    return (
        <div className={clsx(styles.carousel)} ref={carousel}>
            <Swiper
                className={clsx(styles.carousel_wrapper)}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            >
                {children}
                {/* {placeholder} */}
            </Swiper>
        </div>
    );
};

"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";
import { useMegaHero } from "./useMegaHero";
import { useMegaHeroSwiper } from "./useMegaHeroSwiper";

import "swiper/scss/bundle";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
}) => {
    const carousel = useRef<HTMLDivElement>(null);

    useMegaHeroSwiper({ container: carousel });

    const swiper = useMemo(
        () =>
            new Swiper(carousel.current ?? "", {
                a11y: {
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                },
            }),
        [carousel]
    );

    useEffect(() => {
        console.log("swiper", swiper);
    }, [swiper]);

    return (
        <div className={clsx(styles.carousel, "swiper")} ref={carousel}>
            <ul className={clsx(styles.carousel_wrapper, "swiper-wrapper")}>
                {children}
                {/* {placeholder} */}
            </ul>
        </div>
    );
};

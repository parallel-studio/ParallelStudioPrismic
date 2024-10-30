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

import "swiper/scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
}) => {
    const carousel = useRef<HTMLUListElement>(null);

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
        <div className={clsx(styles.carousel)}>
            <ul className={styles.carousel_wrapper} ref={carousel}>
                {children}
                {placeholder}
            </ul>
        </div>
    );
};

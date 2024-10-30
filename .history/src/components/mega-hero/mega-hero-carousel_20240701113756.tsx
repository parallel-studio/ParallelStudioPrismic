"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import {
    A11y,
    Autoplay,
    FreeMode,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";

import "swiper/css/bundle";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
    items?: MegaHeroSliceDefaultPrimary["items"];
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
    items,
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
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                {/* {children} */}
                {items?.map((item, index) => (
                    <MegaHeroItem key={index} item={item} />
                ))}
                {/* {placeholder} */}
            </Swiper>
        </div>
    );
};

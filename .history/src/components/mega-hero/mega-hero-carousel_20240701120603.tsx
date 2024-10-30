"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import { Autoplay, FreeMode, Grid, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";
import { MegaHeroItemClient } from "./mega-hero-item-client";

import "swiper/scss";

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
                modules={[Autoplay, FreeMode, Mousewheel, Grid]}
                freeMode={true}
                // autoplay={{ delay: 0, pauseOnMouseEnter: true }}
                // loop={true}
                mousewheel={true}
                slidesPerView={10}
                grid={{ rows: 10, fill: "row" }}
                spaceBetween={10}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MegaHeroItemClient item={item} />
                    </SwiperSlide>
                ))}
                {/* {placeholder} */}
            </Swiper>
        </div>
    );
};

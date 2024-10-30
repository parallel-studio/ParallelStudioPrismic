"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import { Autoplay, FreeMode, Grid, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item-back";
import { MegaHeroItemClient } from "./mega-hero-item-client";

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
                slidesPerView={"auto"}
                grid={{ rows: 1, fill: "column" }}
                spaceBetween={10}
                centeredSlides={true}
                speed={20000}
                autoplay={{
                    delay: 0,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                }}
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

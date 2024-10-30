"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";
import { Autoplay, Controller, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    useMegaHeroSwiper({ container: carousel });

    return (
        <div className={clsx(styles.carousel)} ref={carousel}>
            <Swiper
                className={clsx(styles.carousel_wrapper)}
                modules={[Autoplay, FreeMode, Mousewheel, Controller]}
                freeMode={true}
                mousewheel={{ enabled: true, eventsTarget: "body" }}
                slidesPerView={"auto"}
                spaceBetween={5}
                centeredSlides={false}
                speed={25000}
                autoplay={{
                    delay: 0,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                }}
                onScroll={(swiper) => {
                    swiper.autoplay.resume();
                }}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MegaHeroItemClient item={item} />
                    </SwiperSlide>
                ))}
                {placeholder}
            </Swiper>
        </div>
    );
};

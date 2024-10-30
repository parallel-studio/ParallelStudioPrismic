"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

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
    const swiperRef = useRef<SwiperType>();
    useMegaHeroSwiper({ container: carousel });

    return (
        <div className={clsx(styles.carousel)} ref={carousel}>
            <Swiper
                ref
                className={clsx(styles.carousel_wrapper)}
                modules={[Autoplay, FreeMode, Mousewheel]}
                freeMode={true}
                mousewheel={{ enabled: true, eventsTarget: "body" }}
                slidesPerView={"auto"}
                spaceBetween={5}
                centeredSlides={false}
                speed={30000}
                autoplay={{
                    delay: 0,
                    // pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                    // disableOnInteraction: true,
                }}
                onScroll={(swiper) => {
                    console.log(swiper);
                    swiper.autoplay.resume();
                }}
                onMouseEnter={(swiper) => {
                    console.log(swiper);
                }}
                onMouseOver={(swiper) => {
                    console.log(swiper);
                }}
                slidesOffsetAfter={300}
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

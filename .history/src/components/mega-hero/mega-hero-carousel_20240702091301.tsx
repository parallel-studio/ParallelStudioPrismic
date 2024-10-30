"use client";

import { FC, ReactNode, useCallback, useRef } from "react";

import clsx from "clsx";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

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
    const swiperRef = useRef<SwiperRef>(null);
    useMegaHeroSwiper({ container: carousel, swiperRef });

    const handleMouseEnter = useCallback(() => {
        swiperRef?.current?.swiper?.autoplay?.stop();
    }, [swiperRef]);

    const handleMouseLeave = useCallback(() => {
        swiperRef?.current?.swiper?.autoplay?.start();
    }, [swiperRef]);

    return (
        <div
            className={clsx(styles.carousel)}
            ref={carousel}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
        >
            <Swiper
                ref={swiperRef}
                className={clsx(styles.carousel_wrapper)}
                modules={[Autoplay, FreeMode, Mousewheel]}
                freeMode={true}
                mousewheel={{ enabled: true, eventsTarget: "body" }}
                slidesPerView={"auto"}
                spaceBetween={5}
                centeredSlides={false}
                speed={1000}
                loop={false}
                autoplay={{
                    delay: 0,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                }}
                // onScroll={(swiper) => {
                //     swiper.autoplay.resume();
                // }}
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

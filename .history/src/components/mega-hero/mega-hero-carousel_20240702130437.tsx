"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";
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
    const swiperRef = useRef<SwiperRef>(null);
    useMegaHeroSwiper({ container: carousel, swiperRef });
    const { isMobileLayoutActive } = useLayout();


        return (
            <div className={clsx(styles.carousel)} ref={carousel}>
               {!isMobileLayoutActive && <Swiper
                    ref={swiperRef}
                    className={clsx(styles.carousel_wrapper)}
                    modules={[Autoplay, FreeMode, Mousewheel]}
                    freeMode={true}
                    mousewheel={{
                        enabled: isMobileLayoutActive ? false : true,
                        eventsTarget: "body",
                    }}
                    slidesPerView={"auto"}
                    spaceBetween={5}
                    speed={isMobileLayoutActive ? 0 : 30000}
                    autoplay={{
                        delay: 0,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: isMobileLayoutActive ? false : true,
                    }}
                    onScroll={(swiper) => {
                        if (!isMobileLayoutActive) swiper.autoplay.resume();
                    }}
                    slidesOffsetAfter={300}
                >
                    {items?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MegaHeroItemClient item={item} />
                        </SwiperSlide>
                    ))}
                    {placeholder}
                </Swiper>}

                {isMobileLayoutActive &&  
                
                <>{items?.map((item, index) => (
                            <MegaHeroItemClient item={item} />
                    ))}
                    {placeholder}}</>
            </div>
        );
};

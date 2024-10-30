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
        <div
            className={clsx(
                styles.carousel,
                isMobileLayoutActive
                    ? styles.carousel_mobile
                    : styles.carousel_desktop
            )}
            ref={carousel}
        >
            {!isMobileLayoutActive && (
                <Swiper
                    ref={swiperRef}
                    className={clsx(styles.carousel_wrapper)}
                    modules={[Autoplay, FreeMode, Mousewheel]}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                        momentumBounce: true,
                        momentumBounceRatio: 10,
                        minimumVelocity: 0.1,
                    }}
                    mousewheel={{
                        enabled: !isMobileLayoutActive,
                        eventsTarget: "body",
                    }}
                    slidesPerView={"auto"}
                    speed={isMobileLayoutActive ? 0 : 15000}
                    // autoplay={{
                    //     delay: 0,
                    //     pauseOnMouseEnter: true,
                    //     disableOnInteraction: true,
                    //     stopOnLastSlide: true,
                    // }}
                    onScroll={(swiper) => {
                        if (!isMobileLayoutActive) swiper.autoplay.resume();
                    }}
                    slidesOffsetAfter={300}
                >
                    {items?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MegaHeroItemClient
                                container={carousel}
                                item={item}
                            />
                        </SwiperSlide>
                    ))}
                    {placeholder}
                </Swiper>
            )}
            {isMobileLayoutActive && (
                <>
                    {items?.map((item, index) => (
                        <MegaHeroItemClient
                            key={index}
                            item={item}
                            variant="mobile"
                            container={carousel}
                        />
                    ))}
                    {placeholder}
                </>
            )}
        </div>
    );
};

"use client";

import { FC, ReactNode, useRef } from "react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import clsx from "clsx";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroSwiper } from "./useMegaHeroSwiper";

import "swiper/scss";
// or only core styles
import "@splidejs/react-splide/css/core";

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

    return (
        <div className={clsx(styles.carousel)} ref={carousel}>
            {/* <Swiper
                ref={swiperRef}
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
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                }}
                onScroll={(swiper) => {
                    swiper.autoplay.resume();
                }}
                slidesOffsetAfter={300}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MegaHeroItemClient item={item} />
                    </SwiperSlide>
                ))}
                {placeholder}
            </Swiper> */}
            <Splide
                hasTrack={false}
                className={clsx(styles.carousel_wrapper)}
                options={{
                    autoWidth: true,
                    // autoHeight: true,
                    gap: "5px",
                    arrows: false,
                    pagination: false,
                    // autoplay: true,
                    drag: "free",
                    pauseOnHover: true,
                    wheel: true,
                    waitForTransition: true,
                    autoScroll: {
                        speed: 0.1,
                    },
                }}
                extensions={{ AutoScroll }}
            >
                <SplideTrack>
                    {items?.map((item, index) => (
                        <SplideSlide
                            key={index}
                            className={styles.item}
                            style={{ aspectRatio: item.muxData?.aspectRatio }}
                        >
                            <MegaHeroItemClient item={item} />
                        </SplideSlide>
                    ))}
                </SplideTrack>
                {placeholder}
            </Splide>
        </div>
    );
};
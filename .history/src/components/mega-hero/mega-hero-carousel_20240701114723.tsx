"use client";

import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import clsx from "clsx";
import { Autoplay, FreeMode } from "swiper/modules";
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
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                {/* {children} */}
                {items?.map((item, index) => (
                    <MegaHeroItemClient key={index} item={item} />
                ))}
                {/* {placeholder} */}

                {/* {items?.map((_, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={clsx(styles.item)}
                            // style={{
                            //     backgroundColor: "red",
                            // }}
                        ></div>
                        <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                        <div className="relative z-10 h-full flex items-center justify-center"></div>
                    </SwiperSlide>
                ))} */}
            </Swiper>
        </div>
    );
};

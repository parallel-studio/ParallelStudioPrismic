"use client";

import { FC } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { motion } from "framer-motion";
import css from "styled-jsx/css";
import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";

import { useLayout } from "@/context/layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";
import { Swiper, SwiperSlide } from "swiper/react";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";
import { MegaHeroItemClienDesktop } from "./mega-hero-item-client-desktop";

type MegaCarouselContainerProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const MegaCarousel: FC<MegaCarouselContainerProps> = ({
    items,
    placeholder,
}) => {
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const { carouselRef } = useMegaHeroMotion({});
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;

    const { className, styles: styleds } = css.resolve`
        /* Pour cacher la scrollbar sur les navigateurs basés sur Webkit (Chrome, Safari) */
        :global(::-webkit-scrollbar) {
            display: none;
        }
        /* Pour cacher la scrollbar sur Firefox */
        :global(html) {
            scrollbar-width: none; /* Firefox */
        }
    `;
    return (
        <motion.div
            className={clsx(styles.carousel, className)}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Swiper
                direction="horizontal"
                className={clsx(styles.carousel, className)}
                modules={[FreeMode, Mousewheel]}
                freeMode={{
                    enabled: true,
                    momentumVelocityRatio: 0.5,
                    // momentumRatio: 3.5,
                    // minimumVelocity: 0.01,
                    // momentumBounce: false,
                }}
                touchRatio={0.3}
                slidesPerView={"auto"}
                resistanceRatio={0.8}
                roundLengths={true}
                slidesOffsetAfter={300}
                // loop={true}
                // loopAdditionalSlides={1}
                // maxBackfaceHiddenSlides={5}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index} className={clsx(styles.item)}>
                        {isMobileLayoutActive && (
                            <MegaHeroItemClientMobile
                                key={index}
                                item={item}
                                container={carouselRef}
                            />
                        )}
                        {!isMobileLayoutActive && (
                            <MegaHeroItemClienDesktop
                                key={index}
                                item={item}
                                container={carouselRef}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

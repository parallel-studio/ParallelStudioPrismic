"use client";

import { FC } from "react";
import { useSwipeable } from "react-swipeable";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { motion } from "framer-motion";
import css from "styled-jsx/css";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLayout } from "@/context/layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

import "swiper/css";
import { useLenis } from "lenis/react";

type MegaCarouselContainerProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const MegaCarouselOld: FC<MegaCarouselContainerProps> = ({
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

    const lenis = useLenis(({ scroll }) => {
        console.log(scroll);
    });

    console.log("LENIS", lenis);

    // const handlers = useSwipeable({
    //     onSwiped: (eventData) => console.log("User Swiped!", eventData),
    // });

    return (
        <div>
            {isMobileLayoutActive && (
                // <div className={clsx(styles.carousel, className)}>
                //     {items.map((item, index) => (
                //         <div key={index} className={clsx(styles.item)}>
                //             <MegaHeroItemClientMobile
                //                 key={index}
                //                 item={item}
                //                 container={carouselRef}
                //             />
                //         </div>
                //     ))}
                // </div>
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
                    <div>
                        {items.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className={clsx(styles.item)}
                                style={{
                                    aspectRatio: item.muxData?.aspectRatio,
                                    width: "auto",
                                }}
                            >
                                <MegaHeroItemClientMobile
                                    key={index}
                                    item={item}
                                    container={carouselRef}
                                />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            )}
            {!isMobileLayoutActive && (
                <motion.div
                    className={clsx(styles.carousel, className)}
                    transition={{
                        duration: 0.5,
                        delay: 1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {styleds}
                    <div
                        className={clsx(
                            styles.carousel_wrapper,
                            "carousel_wrapper"
                        )}
                        ref={carouselRef}
                    >
                        {items.map((item, index) => (
                            <MegaHeroItemClient
                                key={index}
                                item={item}
                                container={carouselRef}
                            />
                        ))}
                        {placeholder && (
                            <PrismicNextLink
                                key={"end"}
                                field={link}
                                className={clsx(
                                    styles.placeholder,
                                    "carousel_placeholder",
                                    "link_div_underline"
                                )}
                                prefetch
                                aria-label={link_label as string}
                            >
                                <div>{link_label}</div>
                            </PrismicNextLink>
                        )}
                    </div>
                    {placeholder && isMobileLayoutActive && (
                        <div
                            key={"place_fake"}
                            className={clsx(
                                styles.fake,
                                "carousel_placeholder"
                            )}
                        >
                            <span>{link_label}</span>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

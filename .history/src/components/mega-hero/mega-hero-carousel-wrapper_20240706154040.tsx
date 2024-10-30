"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaCarouselContainer } from "./mega-hero-carousel-motion";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

import "swiper/scss";

type MegaHeroCarouselProps = {
    placeholder: ReactNode;
    items: ItemWithMuxData[];
};

export const MegaHeroCarousel__M: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
}) => {
    const { scope } = useMegaHeroMotion({});
    const { isMobileLayoutActive } = useLayout();

    return (
        <div
            className={clsx(
                styles.carousel,
                isMobileLayoutActive
                    ? styles.carousel_mobile
                    : styles.carousel_desktop
            )}
        >
            <MegaCarouselContainer items={items} />
            {placeholder}
        </div>
    );
};

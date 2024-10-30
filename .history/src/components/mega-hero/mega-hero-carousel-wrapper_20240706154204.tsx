"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { useLayout } from "@/lib/mobile-layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaCarouselContainer } from "./mega-hero-carousel-motion";

type MegaHeroCarouselProps = {
    placeholder: ReactNode;
    items: ItemWithMuxData[];
};

export const MegaHeroCarousel__M: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
}) => {
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
            {!isMobileLayoutActive && (
                <MegaCarouselContainer
                    key="car_desktop"
                    items={items}
                    variant={"desktop"}
                />
            )}
            {isMobileLayoutActive && (
                <MegaCarouselContainer
                    key="car_mobile"
                    items={items}
                    variant={"mobile"}
                />
            )}{" "}
            {placeholder}
        </div>
    );
};

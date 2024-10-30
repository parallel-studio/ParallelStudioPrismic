"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { useLayout } from "@/lib/mobile-layout";

import styles from "./mega-hero.module.scss";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel__M: FC<MegaHeroCarouselProps> = ({
    children,
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
            {children}
        </div>
    );
};

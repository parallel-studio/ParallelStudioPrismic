"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({ children }) => {
    const sectionPinRef = useRef<HTMLUListElement>(null);
    const sectionToPinRef = useRef<HTMLDivElement>(null);

    useMegaHero({ container: sectionPinRef, sectionToPinRef });

    return (
        <div
            className={clsx(styles.carousel, "carousel")}
            ref={sectionToPinRef}
        >
            <ul
                className={styles.carousel_wrapper}
                ref={sectionPinRef}
                style={{ opacity: 1 }}
            >
                {children}
            </ul>
        </div>
    );
};

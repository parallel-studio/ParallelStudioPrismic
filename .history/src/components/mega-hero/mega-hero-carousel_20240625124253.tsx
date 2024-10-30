"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({ children }) => {
    const container = useRef<HTMLUListElement>(null);

    useMegaHero({ container });

    return (
        <div className={clsx(styles.carousel, "carousel")}>
            <ul
                className={styles.carousel_wrapper}
                ref={container}
                style={{ opacity: 1 }}
            >
                {children}
            </ul>
        </div>
    );
};

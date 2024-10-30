"use client";

import { FC, ReactNode, useRef } from "react";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({ children }) => {
    const sectionPin = useRef<HTMLUListElement>(null);

    useMegaHero({ sectionPin: sectionPin });

    return (
        <div className={styles.carousel}>
            <ul className={styles.carousel_wrapper} ref={sectionPin}>
                {children}
            </ul>
        </div>
    );
};

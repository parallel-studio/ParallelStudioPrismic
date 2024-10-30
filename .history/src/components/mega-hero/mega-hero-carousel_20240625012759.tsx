"use client";

import { FC, ReactNode, useRef } from "react";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({ children }) => {
    const sectionPinRef = useRef<HTMLUListElement>(null);
    const sectionToPinRef = useRef<HTMLDivElement>(null);

    useMegaHero({ sectionPinRef });

    return (
        <div className={styles.carousel} ref={sectionToPinRef}>
            <ul className={styles.carousel_wrapper} ref={sectionPinRef}>
                {children}
            </ul>
        </div>
    );
};

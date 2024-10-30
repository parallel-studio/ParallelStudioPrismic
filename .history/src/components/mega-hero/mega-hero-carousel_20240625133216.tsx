"use client";

import { FC, ReactNode, useRef } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
}) => {
    const container = useRef<HTMLDivElement>(null);
    const carousel = useRef<HTMLUListElement>(null);

    useMegaHero({ container: carousel });

    return (
        <div className={clsx(styles.carousel)}>
            <ul className={styles.carousel_wrapper} ref={carousel}>
                {children}
                {placeholder}
            </ul>
        </div>
    );
};

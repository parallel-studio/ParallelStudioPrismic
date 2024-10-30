"use client";

import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHeroNew } from "./useMegaHeroNew";

type MegaHeroCarouselProps = {
    children: ReactNode;
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    placeholder,
}) => {
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

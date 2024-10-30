"use client";

import { FC, ReactNode, useRef } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import styles from "./mega-hero-carousel.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    children: ReactNode;
    end: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    children,
    end,
}) => {
    const container = useRef<HTMLUListElement>(null);

    useMegaHero({ container });

    return (
        <div className={clsx(styles.carousel)}>
            <ul className={styles.carousel_wrapper} ref={container}>
                {children}
            </ul>
        </div>
    );
};

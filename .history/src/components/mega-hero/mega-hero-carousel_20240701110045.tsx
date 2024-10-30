"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";

import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    items: 
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    placeholder,
}) => {
    const carousel = useRef<HTMLUListElement>(null);

    useMegaHero({ container: carousel });

    return (
        <div className={clsx(styles.carousel)}>
            <ul className={styles.carousel_wrapper} ref={carousel}>
            {items.map((item, index) => (
                            <MegaHeroItem key={index} item={item} />
                        ))}
                {placeholder}
            </ul>
        </div>
    );
};

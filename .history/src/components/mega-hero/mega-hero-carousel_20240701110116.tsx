"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";
import { useMegaHero } from "./useMegaHero";

type MegaHeroCarouselProps = {
    items: MegaHeroSliceDefaultPrimary["items"];
    placeholder: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
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

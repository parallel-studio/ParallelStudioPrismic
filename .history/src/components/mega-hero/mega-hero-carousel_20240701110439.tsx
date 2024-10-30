"use client";

import { FC, ReactNode, useRef } from "react";

import clsx from "clsx";

import { MegaHeroSliceDefaultPrimary } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";
import { useMegaHero } from "./useMegaHero";

// import Swiper styles
import 'swiper/css';


// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper(...);

type MegaHeroCarouselProps = {
    items: MegaHeroSliceDefaultPrimary["items"];
    placeholder: ReactNode;
    endLink: ReactNode;
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    placeholder,
    items,
    endLink,
}) => {
    const carousel = useRef<HTMLUListElement>(null);

    useMegaHero({ container: carousel });

    const swiper = new Swiper(".swiper", {
        a11y: {
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
        },
    });

    return (
        <div className={clsx(styles.carousel)}>
            <ul className={styles.carousel_wrapper} ref={carousel}>
                {endLink}
                {items.map((item, index) => (
                    <MegaHeroItem key={index} item={item} />
                ))}
                {placeholder}
            </ul>
        </div>
    );
};

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

    const [translateX, setTranslateX] = useState(0);
    const scrollStep = 100; // Adjust based on desired scroll amount
    const scrollInterval = 2000; // Adjust based on desired scroll speed

    const autoScrollStarts = useCallback(() => {
        const carouselCurrent = carousel.current;
        if (carouselCurrent) {
            const carouselItems = Array.from(
                carouselCurrent.querySelectorAll(".carousel_item")
            );
            setTranslateX(
                (prevTranslateX) =>
                    (prevTranslateX - scrollStep) %
                    (carouselItems.length * scrollStep)
            );
        }
    }, [carousel]);

    useEffect(() => {
        const intervalId = setInterval(autoScrollStarts, scrollInterval);
        return () => clearInterval(intervalId);
    }, [autoScrollStarts]);

    // useMegaHeroNew({ container: carousel });

    return (
        <div
            className={clsx(styles.carousel)}
            style={{
                transition: "transform 1s ease-out",
                transform: `translateX(${translateX}px)`,
            }}
        >
            <ul className={styles.carousel_wrapper} ref={carousel}>
                {children}
                {placeholder}
            </ul>
        </div>
    );
};

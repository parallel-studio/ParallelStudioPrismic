"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

type MegaCarouselContainerProps = {
    items: ItemWithMuxData[];
    placeholder: ReactNode;
};

export const MegaCarousel: FC<MegaCarouselContainerProps> = ({
    items,
    placeholder,
}) => {
    const { carouselRef } = useMegaHeroMotion({});

    return (
        <div className={clsx(styles.carousel_wrapper)} ref={carouselRef}>
            {items.map((item, index) => (
                <MegaHeroItemClient
                    key={index}
                    item={item}
                    container={carouselRef}
                />
            ))}
            {placeholder}
        </div>
    );
};

"use client";

import { FC } from "react";

import clsx from "clsx";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

type MegaCarouselContainerProps = {
    items: ItemWithMuxData[];
};

export const MegaCarouselContainer: FC<MegaCarouselContainerProps> = ({
    items,
    variant,
}) => {
    const { scope } = useMegaHeroMotion({});

    return (
        <div className={clsx(styles.carousel_wrapper)} ref={scope}>
            {items.map((item, index) => (
                <MegaHeroItemClient key={index} item={item} container={scope} />
            ))}
        </div>
    );
};

"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

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
        <motion.div
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx(styles.carousel_wrapper)}
            ref={carouselRef}
        >
            {items.map((item, index) => (
                <MegaHeroItemClient
                    key={index}
                    item={item}
                    container={carouselRef}
                />
            ))}
            {placeholder}
        </motion.div>
    );
};

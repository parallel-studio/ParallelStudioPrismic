"use client";

import { FC } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { motion } from "framer-motion";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { useMegaHeroMotion } from "./useMegaHeroMotion";

type MegaCarouselContainerProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const MegaCarousel: FC<MegaCarouselContainerProps> = ({
    items,
    placeholder,
}) => {
    const { carouselRef } = useMegaHeroMotion({});
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;

    return (
        <motion.div
            className={clsx(styles.carousel)}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div
                className={clsx(styles.carousel_wrapper, "carousel_wrapper")}
                ref={carouselRef}
            >
                <div>
                    {items.map((item, index) => (
                        <MegaHeroItemClient
                            key={index}
                            item={item}
                            container={carouselRef}
                        />
                    ))}
                </div>
                {placeholder && (
                    <PrismicNextLink
                        key={"end"}
                        field={link}
                        className={clsx(styles.end, "carousel_placeholder")}
                        prefetch
                        aria-label={link_label as string}
                    >
                        <span>{link_label}</span>
                    </PrismicNextLink>
                )}
            </div>
        </motion.div>
    );
};

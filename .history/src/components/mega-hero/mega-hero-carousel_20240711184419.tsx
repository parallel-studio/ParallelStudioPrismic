"use client";

import { FC } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { motion } from "framer-motion";
import css from "styled-jsx/css";

import { useLayout } from "@/context/layout";

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
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const { carouselRef } = useMegaHeroMotion({});
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;

    const { className, styles: styleds } = css.resolve`
        /* Pour cacher la scrollbar sur les navigateurs basés sur Webkit (Chrome, Safari) */
        :global(::-webkit-scrollbar) {
            display: none;
        }
        /* Pour cacher la scrollbar sur Firefox */
        :global(html) {
            scrollbar-width: none; /* Firefox */
        }
    `;

    return (
        <motion.div
            className={clsx(styles.carousel, className)}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {styleds}
            <div
                className={clsx(styles.carousel_wrapper, "carousel_wrapper")}
                ref={carouselRef}
            >
                {items.map((item, index) => (
                    <MegaHeroItemClient
                        key={index}
                        item={item}
                        container={carouselRef}
                    />
                ))}
                {placeholder && (
                    <PrismicNextLink
                        key={"end"}
                        field={link}
                        className={clsx(
                            styles.placeholder,
                            "carousel_placeholder"
                        )}
                        prefetch
                        aria-label={link_label as string}
                    >
                        <span>{link_label}</span>
                    </PrismicNextLink>
                )}
            </div>
            {/* {placeholder && isMobileLayoutActive && (
                <div
                    key={"place_fake"}
                    className={clsx(styles.fake, "carousel_placeholder")}
                >
                    <span>{link_label}</span>
                </div>
            )} */}
        </motion.div>
    );
};

"use client";

import { FC } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

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
        <>
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
            </div>
            {placeholder && (
                <div className={clsx(styles.end)}>
                    <PrismicNextLink
                        key={"end"}
                        field={link}
                        className={clsx(styles.end, "carousel_placeholder")}
                        prefetch
                        aria-label={link_label as string}
                    >
                        <span>{link_label}</span>
                    </PrismicNextLink>
                </div>
            )}
        </>
    );
};

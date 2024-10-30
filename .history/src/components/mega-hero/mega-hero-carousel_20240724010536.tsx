"use client";

import React, { FC, useRef } from "react";
import { isIOS } from "react-device-detect";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useLayout } from "@/context/layout";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClientDesktop } from "./mega-hero-item-client-desktop";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";

type MegaHeroCarouselProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    items,
    placeholder,
}) => {
    const carouselRef = useRef(null);
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;
    const { activeLayout } = useLayout();
    const showMobileVersion = activeLayout === "mobile";

    return (
        <div className={styles.carousel}>
            <ul ref={carouselRef} className={styles.carousel_wrapper}>
                {items.map((item, index) => (
                    <MegaHeroItemClientDesktop
                        key={index}
                        item={item}
                        container={carouselRef}
                    />
                ))}
                {placeholder && (
                    <li key={"end"}>
                        <PrismicNextLink
                            field={link}
                            className={clsx(
                                styles.placeholder,
                                "carousel_placeholder",
                                "link_div_underline"
                            )}
                            prefetch
                            aria-label={link_label as string}
                        >
                            <div>{link_label}</div>
                        </PrismicNextLink>
                    </li>
                )}
            </ul>
            {placeholder && showMobileVersion && (
                <div
                    key={"place_fake"}
                    className={clsx(styles.fake, "carousel_placeholder")}
                >
                    <div>{link_label}</div>
                </div>
            )}
        </div>
    );
};

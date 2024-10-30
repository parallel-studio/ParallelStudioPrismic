"use client";

import React, { FC, useRef } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { ItemWithMuxData } from ".";
import styles from "./mega-hero.module.scss";
import { MegaHeroItemClientGsap } from "./mega-hero-item-client-gsap";
import { useLayout } from "@/context/layout";

type MegaHeroCarouselProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const MegaHeroCarouselGsap: FC<MegaHeroCarouselProps> = ({
    items,
    placeholder,
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    return (
        <div className={styles.carousel}>
            <div ref={carouselRef} className={styles.carousel_wrapper}>
                {isMobileLayoutActive &&
                    items.map((item, index) => (
                        <MegaHeroItemClientGsap
                            key={index}
                            item={item}
                            container={carouselRef}
                        />
                    ))}
                {!isMobileLayoutActive &&
                    items.map((item, index) => (
                        <MegaHeroItemClientGsap
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
                            "carousel_placeholder",
                            "link_div_underline"
                        )}
                        prefetch
                        aria-label={link_label as string}
                    >
                        <div>{link_label}</div>
                    </PrismicNextLink>
                )}
            </div>
        </div>
    );
};

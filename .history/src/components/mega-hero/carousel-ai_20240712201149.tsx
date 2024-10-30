"use client";

import React, { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ItemWithMuxData } from ".";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";
import Draggable from "gsap/Draggable";

import styles from "./mega-hero.module.scss";
import { MegaHeroItemClientGsap } from "./mega-hero-item-client-gsap";
import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
gsap.registerPlugin(ScrollTrigger, Draggable);

type CarouselAiProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

export const CarouselAi: FC<CarouselAiProps> = ({ items, placeholder }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;

    return (
        <div className={styles.carousel}>
            <div ref={carouselRef} className={styles.carousel_wrapper}>
                {items.map((item, index) => (
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

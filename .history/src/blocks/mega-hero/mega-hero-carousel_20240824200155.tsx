"use client";

import React, { FC, useEffect, useRef } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";

import { useMegaHeroApi } from "./context";
import { ItemWithMuxData } from "./mega-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroItem } from "./mega-hero-item";

type MegaHeroCarouselProps = {
    items: ItemWithMuxData[];
    placeholder?: { link: LinkField; link_label: string };
};

gsap.registerPlugin(ScrollTrigger, Observer);

export const MegaHeroCarousel: FC<MegaHeroCarouselProps> = ({
    items,
    placeholder,
}) => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const link = placeholder?.link;
    const link_label = placeholder?.link_label;
    const { setIsContainerTouched, showMobileVersion } = useMegaHeroApi();

    useEffect(() => {
        if (carouselRef.current) {
            if (!showMobileVersion) {
                carouselRef.current.classList.remove(styles.scroll);
                return;
            }

            carouselRef.current.classList.add(styles.scroll);

            const handleTouch = () => {
                if (setIsContainerTouched) setIsContainerTouched(true);
            };

            const setupScrollTrigger = () => {
                Observer.create({
                    target: carouselRef.current,
                    type: "wheel, touch",
                    onChangeX: handleTouch,
                    tolerance: 20,
                });
            };

            setupScrollTrigger();
        }

        return () => {
            ScrollTrigger.killAll();
        };
    }, [showMobileVersion, setIsContainerTouched]);

    return (
        <div className={styles.carousel}>
            <ul ref={carouselRef} className={styles.carousel_wrapper}>
                {items.map((item, index) => (
                    <MegaHeroItem
                        key={index}
                        item={item}
                        carousel={carouselRef}
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

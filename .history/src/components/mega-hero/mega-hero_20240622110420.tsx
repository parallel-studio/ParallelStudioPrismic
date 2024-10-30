"use client";
import { FC, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";
import { PrismicNextImage } from "@prismicio/next";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

const ITEMS = [{ ar: "h" }, { ar: "h" }, { ar: "v" }, { ar: "v" }, { ar: "h" }];

export const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
    const {
        primary: { slogan, items },
    } = slice;
    const wrapperRef = useRef<HTMLDivElement>(null);

    useMegaHero({ wrapperRef });

    console.log(slice);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slogan} />
            <div className={styles.carousel}>
                <div className={styles.carousel_wrapper} ref={wrapperRef}>
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.carousel_item,
                                _.display === "horizontal" ? styles.h : styles.v
                            )}
                        >
                            {index}
                        </div>
                    ))}
                    <PrismicNextImage field={} />
                    <a href="/#" className={clsx(styles.end)}>
                        <span>{"SEE ALL"}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

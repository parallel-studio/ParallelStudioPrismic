"use client";

import { FC, useRef } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItemContainer } from "./mega-hero-item-container";
import { useMegaHero } from "./useMegaHero";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;
    const wrapperRef = useRef<HTMLUListElement>(null);

    useMegaHero({ wrapperRef });

    return (
        <MegaHeroProvider>
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <Megar
                    <div className={styles.carousel}>
                        <ul
                            className={styles.carousel_wrapper}
                            ref={wrapperRef}
                        >
                            {items.map((item, index) => (
                                <MegaHeroItemContainer
                                    key={index}
                                    item={item}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

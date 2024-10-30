"use client";

import { FC, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItem } from "./mega-hero-item";
import { useMegaHero } from "./useMegaHero";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
    const {
        primary: { slogan, items },
    } = slice;
    const wrapperRef = useRef<HTMLDivElement>(null);

    useMegaHero({ wrapperRef });

    console.log(slice);

    return (
        <MegaHeroProvider>
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <div className={styles.carousel}>
                        <div
                            className={styles.carousel_wrapper}
                            ref={wrapperRef}
                        >
                            {items.map((item, index) => (
                                <MegaHeroItem key={index} item={item} />
                            ))}
                            <a href="/#" className={clsx(styles.end)}>
                                <span>{"SEE ALL"}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

"use client";

import { FC, useRef } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";

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
gsap.registerPlugin(ScrollToPlugin);

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
                    <div className={styles.carousel}>
                        <ul
                            className={styles.carousel_wrapper}
                            ref={wrapperRef}
                        >
                            {items.map((item, index) => (
                                <MegaHeroItem key={index} item={item} />
                            ))}
                            <li className={clsx(styles.end)}>
                                <PrismicNextLink field={link} prefetch>
                                    <span>{link_label}</span>
                                </PrismicNextLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

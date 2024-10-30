"server only";

import { FC } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItemContainer } from "./mega-hero-item-container";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;
    return (
        <MegaHeroProvider>
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <MegaHeroCarousel>
                        {items.map((item, index) => (
                            <MegaHeroItemContainer key={index} item={item} />
                        ))}
                        <li className={clsx(styles.end)}>
                            <PrismicNextLink field={link} prefetch>
                                <span>{link_label}</span>
                            </PrismicNextLink>
                        </li>
                    </MegaHeroCarousel>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

"server only";

import { FC } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { SmoothScrolling } from "@/lib/lenis";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context-hero";
import styles from "./mega-hero.module.scss";
import { MegaHeroCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItem } from "./mega-hero-item";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: FC<MegaHeroProps> = ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;
    return (
        <SmoothScrolling
            options={{ orientation: "horizontal", lerp: 0.1, duration: 2 }}
        >
            <MegaHeroProvider>
                <div className={styles.mega}>
                    <MegaHeroHeader slogan={slogan} />
                    <div>
                        <MegaHeroInfo />
                        <MegaHeroCarousel
                            end={
                                <div className={clsx(styles.end)}>
                                    <PrismicNextLink field={link} prefetch>
                                        <span>{link_label}</span>
                                    </PrismicNextLink>
                                </div>
                            }
                        >
                            {items.map((item, index) => (
                                <MegaHeroItem key={index} item={item} />
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
        </SmoothScrolling>
    );
};

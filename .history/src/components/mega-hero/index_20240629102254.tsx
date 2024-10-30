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
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

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
                <MegaHeroVideoFullScreen />
                <div className={styles.mega}>
                    <MegaHeroHeader slogan={slogan} />
                    <div>
                        <MegaHeroInfo />
                        <MegaHeroCarousel
                            placeholder={
                                <div
                                    className={clsx(
                                        styles.end,
                                        styles.placeholder
                                    )}
                                >
                                    <span>{link_label}</span>
                                </div>
                            }
                        >
                            {items.map((item, index) => (
                                <MegaHeroItem key={index} item={item} />
                            ))}
                            <li>
                                <PrismicNextLink
                                    key={"end"}
                                    field={link}
                                    className={clsx(styles.end)}
                                    prefetch
                                    aria-label={link_label as string}
                                ></PrismicNextLink>
                            </li>
                        </MegaHeroCarousel>
                    </div>
                </div>
            </MegaHeroProvider>
        </SmoothScrolling>
    );
};

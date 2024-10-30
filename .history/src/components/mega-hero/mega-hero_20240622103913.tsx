"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

gsap.registerPlugin(ScrollToPlugin);

const ITEMS = [{ ar: "h" }, { ar: "h" }, { ar: "v" }, { ar: "v" }, { ar: "h" }];

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useMegaHero({ wrapperRef });

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel}>
                <div className={styles.carousel_wrapper} ref={wrapperRef}>
                    {ITEMS.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.carousel_item,
                                _.ar === "h" ? styles.h : styles.v
                            )}
                        >
                            {index}
                        </div>
                    ))}
                    <a href="/#" className={clsx(styles.end)}>
                        <span>{"SEE ALL"}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

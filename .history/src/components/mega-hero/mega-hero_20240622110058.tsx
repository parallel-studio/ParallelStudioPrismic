"use client";
import { FC, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

const ITEMS = [{ ar: "h" }, { ar: "h" }, { ar: "v" }, { ar: "v" }, { ar: "h" }];

export const MegaHeroComponent: FC<MegaHeroProps> = ({
    slice: {
        primary: { slogan },
    },
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useMegaHero({ wrapperRef });

    console.log(slice);

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

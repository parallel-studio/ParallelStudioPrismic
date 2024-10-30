"use client";

import { FC, useRef } from "react";
import ReactPlayer from "react-player";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";

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
                    {items.map((item, index) => {
                        const { display, image, project, video } = item;
                        console.log(display);
                        return (
                            <PrismicNextLink
                                key={index}
                                className={clsx(
                                    styles.carousel_item,
                                    display === "horizontal"
                                        ? styles.h
                                        : styles.v
                                )}
                                field={project}
                            >
                                {video && (
                                    <ReactPlayer url={asLink(video) as any} />
                                )}
                                {!video && (
                                    <PrismicNextImage field={image} alt="" />
                                )}
                            </PrismicNextLink>
                        );
                    })}
                    <a href="/#" className={clsx(styles.end)}>
                        <span>{"SEE ALL"}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

"use client";

import { FC, useRef } from "react";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";
import { useMegaHero } from "./useMegaHero";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: true });

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
        <PrismicNextLink
            className={clsx(
                styles.carousel_item,
                display === "horizontal" ? styles.h : styles.v
            )}
            field={project}
        >
            {"url" in video && (
                <ReactPlayer
                    key={"video"}
                    url={asLink(video) as any}
                    loop
                    width={"100%"}
                    height={"100%"}
                    playing
                    muted
                />
            )}
            {"url" in video === false && (
                <PrismicNextImage key={"image"} field={image} alt="" />
            )}
        </PrismicNextLink>
    );
};

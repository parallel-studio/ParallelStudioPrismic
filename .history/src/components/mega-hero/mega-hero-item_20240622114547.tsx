"use client";

import { FC } from "react";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero-item.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: true });

type MegaHeroItemProps = {
    item: MegaHeroSlice["items"][number];
};

export const MegaHeroItem: FC<MegaHeroItemProps> = ({ item }) => {
    const { display, image, project, video } = item;

    return (
        <PrismicNextLink
            className={clsx(
                styles.item,
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

"use client";

import { FC, useRef } from "react";
import { useEffect, useState } from "react";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useTheme } from "@/context/theme";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-item.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: true });

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroItemProps> = ({ item }) => {
    const videoRef = useRef<HTMLAnchorElement>(null);
    const { display, image, project, video } = item;
    const [isHovering, setIsHovering] = useState(false);
    const { setItem } = useMegaHeroApi();
    const { theme } = useTheme();

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                setItem(item);
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
            };

            video.addEventListener("mouseenter", handleMouseEnter);
            video.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                video.removeEventListener("mouseenter", handleMouseEnter);
                video.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [videoRef, setItem, item]);

    const { className, styles: styleds } = css.resolve`
        a {
            background-color: ${theme?.color ?? "black"};
        }
    `;

    return (
        <PrismicNextLink
            className={clsx(
                styles.item,
                display === "horizontal" ? styles.h : styles.v
            )}
            field={project}
            ref={videoRef}
        >
            {"url" in video && (
                <ReactPlayer
                    key={"video"}
                    url={asLink(video) as any}
                    loop
                    width={"100%"}
                    height={"100%"}
                    playing={isHovering}
                    muted
                />
            )}
            {"url" in video === false && (
                <PrismicNextImage key={"image"} field={image} alt="" />
            )}
        </PrismicNextLink>
    );
};

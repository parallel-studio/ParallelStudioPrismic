"use client";

import { FC, useRef } from "react";
import { useEffect } from "react";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { useVideoStart } from "@/hooks/useVideoStart";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-item.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroItemProps> = ({ item }) => {
    const videoRef = useRef<HTMLAnchorElement>(null);
    const { display, image, project, video } = item;
    const { setItem } = useMegaHeroApi();

    const { isHovering } = useVideoStart({ ref: videoRef });

    useEffect(() => {
        if (isHovering) {
            setItem(item);
        } else {
            setItem(undefined);
        }
    }, [isHovering, item, setItem]);

    return (
        <li
            className={clsx(
                styles.item,
                display === "horizontal" ? styles.h : styles.v
            )}
        >
            <PrismicNextLink field={project} ref={videoRef} prefetch>
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
        </li>
    );
};

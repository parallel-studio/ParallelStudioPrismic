"use client";

import { FC, RefObject, useRef } from "react";
import { useEffect, useState } from "react";

import { asLink } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-item.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: true });

type MegaHeroItemProps = {
    ref: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({ ref }) => {
    useEffect(() => {
        const video = ref.current;

        if (video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                setItem(item);
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                setItem(undefined);
            };

            video.addEventListener("mouseenter", handleMouseEnter);
            video.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                video.removeEventListener("mouseenter", handleMouseEnter);
                video.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [videoRef, setItem, item]);
};

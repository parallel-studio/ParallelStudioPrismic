"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

type MegaHeroItemProps = {
    ref: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({ ref }) => {
    const [isHovering, setIsHovering] = useState(false);

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

    return {
        isHovering,
    };
};

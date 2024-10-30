"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

type UseVideoStartProps = {
    ref: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({ ref }: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const video = ref.current;

        if (video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
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
    }, [ref]);

    return {
        isHovering,
    };
};

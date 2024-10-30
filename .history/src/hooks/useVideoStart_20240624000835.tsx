"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

type UseVideoStartProps = {
    videoRef: RefObject<MuxPlayerRefAttributes>;
    containerRef: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({ videoRef: ref }: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const video = ref.current;

        if (video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                video.play();
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                video.pause();
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

"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

type UseVideoStartProps = {
    ref: RefObject<MuxPlayerRefAttributes>;
};

export const useVideoStart = ({ ref }: UseVideoStartProps) => {
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

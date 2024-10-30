"use client";

import { useEffect, useState } from "react";

type UseVideoStartProps = {
    videoRef: HTMLVideoElement | undefined;
};

export const useVideoStart = ({ videoRef }: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const video = videoRef;
        if (video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                video.play();
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                video.pause();
            };

            video.addEventListener("mouseover", handleMouseEnter);
            video.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                video.removeEventListener("mouseover", handleMouseEnter);
                video.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [videoRef]);

    return {
        isHovering,
    };
};

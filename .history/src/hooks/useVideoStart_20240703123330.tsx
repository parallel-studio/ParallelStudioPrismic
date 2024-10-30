"use client";

import { useEffect, useState } from "react";

type UseVideoStartProps = {
    containerRef: HTMLElement | undefined;
    videoRef: HTMLVideoElement | undefined;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const video = videoRef;
        const container = containerRef;
        if (video && container) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                video.play();
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                video.pause();
            };

            container.addEventListener("mouseover", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                container.removeEventListener("mouseover", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [videoRef, containerRef]);

    return {
        isHovering,
    };
};

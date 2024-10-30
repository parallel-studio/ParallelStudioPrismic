"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

type UseVideoStartProps = {
    videoRef: HTMLVideoElement | undefined;
    containerRef: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef;
        if (container && video) {
            const handleMouseEnter = () => {
                setIsHovering(true);
                video.play();
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                video.pause();
            };

            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [videoRef, containerRef]);

    return {
        isHovering,
    };
};

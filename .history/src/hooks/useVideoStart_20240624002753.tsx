"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

type UseVideoStartProps = {
    videoRef: any;
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
        if (container) {
            const handleMouseEnter = () => {
                console.log(video);
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

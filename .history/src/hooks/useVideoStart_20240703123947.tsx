"use client";

import { RefObject, useEffect, useState } from "react";

type UseVideoStartProps = {
    containerRef?: RefObject<HTMLDivElement>;
    videoRef?: HTMLVideoElement;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const video = videoRef;
        const container = containerRef?.current;
        if (video && container) {
            const handleMouseEnter = () => {
                console.log("enter");
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

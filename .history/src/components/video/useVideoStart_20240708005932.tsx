"use client";

import { RefObject, useEffect, useState } from "react";

type UseVideoStartProps = {
    containerRef?: RefObject<HTMLDivElement | HTMLAnchorElement>;
    videoRef?: HTMLVideoElement;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const video = videoRef;
        const container = containerRef?.current;

        const handleMouseEnter = () => {
            setIsHovering(true);
            setHasStarted(true);
            video?.play();
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            video?.pause();
        };

        container?.addEventListener("mouseover", handleMouseEnter);
        container?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container?.removeEventListener("mouseover", handleMouseEnter);
            container?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [videoRef, containerRef]);

    return {
        isHovering,
        hasStarted,
    };
};

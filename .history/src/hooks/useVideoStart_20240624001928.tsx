"use client";

import { RefObject } from "react";
import { useEffect, useState } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

type UseVideoStartProps = {
    videoRef: RefObject<MuxPlayerRefAttributes>;
    containerRef: RefObject<HTMLAnchorElement | HTMLElement>;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (container) {
            const handleMouseEnter = () => {
                console.log(containerRef?.current?.querySelector("style"));
                setIsHovering(true);
                // video.querySelector("video")?.play();
            };

            const handleMouseLeave = () => {
                setIsHovering(false);
                // video.querySelector("video")?.pause();
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

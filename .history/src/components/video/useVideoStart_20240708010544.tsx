"use client";

import { RefObject, useState } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";

type UseVideoStartProps = {
    videoRef?: RefObject<MuxPlayerRefAttributes>;
    containerRef?: RefObject<HTMLDivElement | HTMLAnchorElement>;
};

export const useVideoStart = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useIsomorphicLayoutEffect(() => {
        const video = videoRef?.current?.media?.nativeEl;
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

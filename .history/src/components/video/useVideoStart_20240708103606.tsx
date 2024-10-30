"use client";

import { RefObject, useCallback, useState } from "react";

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
    const video = videoRef?.current?.media?.nativeEl;
    const container = containerRef?.current;

    useIsomorphicLayoutEffect(() => {
        const handleMouseEnter = () => {
            video?.play();
        };

        const handleMouseLeave = () => {
            video?.pause();
        };

        container?.addEventListener("mouseover", handleMouseEnter);
        container?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container?.removeEventListener("mouseover", handleMouseEnter);
            container?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [video, container]);
};

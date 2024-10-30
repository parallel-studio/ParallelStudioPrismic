"use client";

import { RefObject } from "react";

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
            console.log("ENTER");
            video?.play();
        };

        const handleMouseLeave = () => {
            video?.pause();
        };

        container?.addEventListener("mouseenter", handleMouseEnter);
        container?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container?.removeEventListener("mouseenter", handleMouseEnter);
            container?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [video, container]);
};

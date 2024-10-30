"use client";

import { RefObject, use } from "react";

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
    // Video is a function that returns the video element, otherwise it returns undefined on first render
    const video = () => videoRef?.current?.media?.nativeEl;
    const container = containerRef?.current;

    useIsomorphicLayoutEffect(() => {}, [video]);

    useIsomorphicLayoutEffect(() => {
        const handleMouseEnter = () => {
            video()?.play();
        };

        const handleMouseLeave = () => {
            video()?.pause();
        };

        container?.addEventListener("mouseover", handleMouseEnter);
        container?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container?.removeEventListener("mouseover", handleMouseEnter);
            container?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [video, container]);
};

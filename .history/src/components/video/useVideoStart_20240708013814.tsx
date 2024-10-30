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
    const video = videoRef?.current?.media?.nativeEl;
    const container = containerRef?.current;

    useIsomorphicLayoutEffect(() => {
        const handleMouseEnter = () => {
            video?.play();
        };

        const handleMouseLeave = () => {
            video?.pause();
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            const isIntersecting = entries[0]?.isIntersecting;
            if (isIntersecting) {
                handleMouseEnter();
            } else {
                handleMouseLeave();
            }
        };

        const observer = new IntersectionObserver(handleIntersection);

        if (container) {
            observer?.observe(container);
        }

        return () => {
            if (container) {
                observer?.unobserve(container);
            }
        };

        // container?.addEventListener("mouseenter", handleMouseEnter);
        // container?.addEventListener("mouseleave", handleMouseLeave);

        // return () => {
        //     container?.removeEventListener("mouseenter", handleMouseEnter);
        //     container?.removeEventListener("mouseleave", handleMouseLeave);
        // };
    }, [video, container]);
};

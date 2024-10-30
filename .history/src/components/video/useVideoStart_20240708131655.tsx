"use client";

import { RefObject, use, useState } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";

type UseVideoStartProps = {
    videoRef?: RefObject<HTMLVideoElement>;
    containerRef?: RefObject<HTMLDivElement | HTMLAnchorElement>;
};

export const useVideoHover = ({
    videoRef,
    containerRef,
}: UseVideoStartProps) => {
    // Video is a function that returns the video element, otherwise it returns undefined on first render
    // const video = () => videoRef?.current?.media?.nativeEl;

    const video = () => videoRef?.current;
    const container = containerRef?.current;
    const [isPlaying, setIsPlaying] = useState(false);

    // useIsomorphicLayoutEffect(() => {
    //     video()?.style.setProperty("min-width", "calc(100% + 2px)");
    //     video()?.style.setProperty("min-height", "calc(100% + 2px)");
    //     video()?.style.setProperty(
    //         "transform",
    //         "translateX(-1px) translateY(-1px)"
    //     );
    // }, [video]);

    // useIsomorphicLayoutEffect(() => {
    //     video?.style.setProperty("min-width", "calc(100% + 2px)");
    //     video?.style.setProperty("min-height", "calc(100% + 2px)");
    //     video?.style.setProperty(
    //         "transform",
    //         "translateX(-1px) translateY(-1px)"
    //     );
    // }, [video]);

    useIsomorphicLayoutEffect(() => {
        // const handleMouseEnter = () => {
        //     video()?.play();
        //     setIsPlaying(true);
        // };

        // const handleMouseLeave = () => {
        //     video()?.pause();
        //     setIsPlaying(false);
        // };

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

    return { isPlaying };
};

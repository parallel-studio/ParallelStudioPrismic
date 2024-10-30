"use client";

import { RefObject, useEffect, useMemo, useState } from "react";

import { useLayout } from "@/context/layout";

export type UseVideoHoverOptions = {
    autoPlay?: boolean;
    alwaysOn?: boolean;
};

type useVideoHoverProps<T extends HTMLElement> = {
    videoRef?: RefObject<HTMLVideoElement>;
    containerRef?: RefObject<T>;
} & UseVideoHoverOptions;

export const useVideoHover = ({
    videoRef,
    containerRef,
    autoPlay = false,
    alwaysOn = false,
}: useVideoHoverProps<HTMLElement>) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const video = () => videoRef?.current;
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [canStart, setCanStart] = useState(false);
    const { activeLayout } = useLayout();

    const isMobileLayoutActive = activeLayout === "mobile";

    const container = containerRef?.current;

    const showPlaceHolder = useMemo(() => {
        if (isMobileLayoutActive && !canStart) return true;
        else return false;
    }, [isMobileLayoutActive, canStart]);

    useEffect(() => {
        if (isPlaying && canStart) {
            video()?.play();
        } else {
            video()?.pause();
        }

        return () => {
            video()?.pause();
        };
    }, [isPlaying, video, canStart]);

    useEffect(() => {
        const handleMouseEnter = () => {
            setIsPlaying(true);
        };

        const handleMouseLeave = () => {
            setIsPlaying(false);
        };

        if (alwaysOn) {
            return;
        }

        container?.addEventListener("mouseout", handleMouseLeave);
        container?.addEventListener("mouseover", handleMouseEnter);

        return () => {
            container?.removeEventListener("mouseover", handleMouseEnter);
            container?.removeEventListener("mouseout", handleMouseLeave);
        };
    }, [video, container, alwaysOn, setIsPlaying]);

    return {
        setHasStarted: setCanStart,
        isMobileLayoutActive,
        showPlaceHolder,
        alwaysOn,
        setIsPlaying,
    };
};

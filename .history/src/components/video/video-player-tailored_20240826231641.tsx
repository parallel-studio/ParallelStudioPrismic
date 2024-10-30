"use client";

import { FC, useCallback, useEffect, useId, useRef } from "react";

import { MuxPlayerProps, MuxPlayerRefAttributes } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import clsx from "clsx";
import { colord } from "colord";
import { useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { MediaThemeElement } from "media-chrome/dist/media-theme-element.js";

import { useTheme } from "@/context/theme";

import { ParalellTemplateProps, parallelTemplate } from "./parallel-template";
import styles from "./video-player.module.scss";

type UseVideoPlayerMuxProps = {
    options?: {
        smallScreenModeContain?: boolean;
        centerOnPlay?: boolean;
    };
    template?: ParalellTemplateProps;
};

export type VideoPlayerMuxProps = {
    playbackId: string;
    aspectRatio?: number;
    color?: string;
    thumbnailTime?: number;
} & UseVideoPlayerMuxProps &
    MuxPlayerProps;

const useVideoPlayerMux = ({
    options: { smallScreenModeContain = false, centerOnPlay = true } = {},
    template: templateProps,
}: UseVideoPlayerMuxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoEl = useRef<MuxPlayerRefAttributes>(null);
    const id = useId();
    const lenis = useLenis();
    const inView = useInView(containerRef);

    const toggleMediaObjectFitContain = useCallback(() => {
        const target = containerRef.current;
        if (target) {
            if (smallScreenModeContain || document.fullscreenElement) {
                target.setAttribute("data-contain", "true");
            } else if (!smallScreenModeContain && !document.fullscreenElement) {
                target.setAttribute("data-contain", "false");
            }
        }
    }, [smallScreenModeContain]);

    const handleClick = useCallback(() => {
        const videoElement = videoEl.current;
        if (videoElement && centerOnPlay) {
            const videoRect = videoElement.getBoundingClientRect();
            const scrollToY =
                window.scrollY +
                videoRect.top +
                videoRect.height / 2 -
                window.innerHeight / 2;

            lenis?.scrollTo(scrollToY, { duration: 1 });
        }
    }, [videoEl, lenis, centerOnPlay]);

    useEffect(() => {
        document.addEventListener(
            "fullscreenchange",
            toggleMediaObjectFitContain
        );
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                toggleMediaObjectFitContain
            );
        };
    }, [toggleMediaObjectFitContain]);

    useEffect(() => {
        const videoElement = videoEl.current;

        if (videoElement && !inView) {
            videoElement.pause();
        }
    }, [inView, videoEl, lenis]);

    useEffect(() => {
        const template = document.createElement("template");
        template.innerHTML = parallelTemplate({ ...templateProps });
        const elementName = "media-theme-tiny";

        class MediaParallel extends MediaThemeElement {
            static template = template;
            static setTemplate(newTemplate: HTMLTemplateElement) {
                this.template = newTemplate;
            }
        }

        const element = globalThis.customElements.get(elementName);

        if (!element) {
            globalThis.customElements.define(elementName, MediaParallel);
            return;
        }

        element.prototype.constructor.setTemplate(template);
    }, [templateProps]);

    return {
        containerRef,
        videoEl,
        toggleMediaObjectFitContain,
        id,
        handleClick,
    };
};

export const VideoPlayerMux: FC<VideoPlayerMuxProps> = ({
    playbackId,
    aspectRatio,
    thumbnailTime,
    color,
    className: classNameProp,
    options,
    template,
    ...props
}) => {
    const { theme: themeColor } = useTheme();

    const primaryColor =
        color ?? !colord(themeColor.color).isEqual("rgb(0, 0, 0)")
            ? themeColor.color
            : "white";

    const { style, ...etc } = props;

    const playerStyle = {
        ...style,
        aspectRatio: aspectRatio ? `${aspectRatio}!important` : "auto",
    };

    const {
        containerRef,
        videoEl,
        toggleMediaObjectFitContain,
        id,
        handleClick,
    } = useVideoPlayerMux({
        options,
        template,
    });

    return (
       
    );
};

"use client";

import {
    FC,
    HTMLAttributes,
    MouseEvent,
    RefObject,
    useEffect,
    useId,
    useRef,
} from "react";
import React from "react";

import MuxVideo from "@mux/mux-video-react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

import { useVideo } from "@/context/video";
import { MuxData } from "@/lib/mux-data-prismic";

import { useVideoHover, UseVideoHoverOptions } from "./useVideoOnHover";
import styles from "./video-player.module.scss";

type VideoOnHoverProps<T extends HTMLElement> = {
    muxData: MuxData;
    containerRef: RefObject<T>;
    placeholder?: {
        quality?: number;
        fill?: boolean;
        backgroundColor?: string;
    };
    imageProps?: Partial<ImageProps> & HTMLAttributes<HTMLImageElement>;
    imageClassName?: string;
    resume?: { time: number; canPlay: boolean };
    className?: string;
} & UseVideoHoverOptions;

export const VideoOnHover: FC<VideoOnHoverProps<HTMLElement>> = ({
    muxData,
    containerRef,
    placeholder,
    imageProps,
    imageClassName,
    autoPlay,
    alwaysOn,
    resume,
    className,
}) => {
    const id = useId();
    const videoRef = useRef<HTMLVideoElement>(null);

    const { setCanStart, showPlaceHolder, setIsPlaying } = useVideoHover({
        videoRef,
        containerRef,
        autoPlay,
        alwaysOn,
    });
    const { setStartTime, setVideoId } = useVideo();

    const playbackId = muxData.playbackId;
    const aspectRatio = muxData?.aspectRatio;
    const imageURL = muxData?.imageURL;
    const imageDataURL = muxData?.imageDataURL;

    const fillProps = {
        fill: true,
    };

    const containProps = {
        width: aspectRatio
            ? aspectRatio * 300 * (placeholder?.quality ?? 1)
            : undefined,
        height: 300 * (placeholder?.quality ?? 1),
        fill: false,
    };

    const placeholderProps = placeholder?.fill ? fillProps : containProps;

    const handleClick = (e: MouseEvent<HTMLVideoElement>) => {
        setIsPlaying(false);
        setVideoId(playbackId);
        setStartTime(e.currentTarget.currentTime);
    };

    // Important to set the video time after the video has loaded and popup is closed
    useEffect(() => {
        if (videoRef.current && resume?.canPlay) {
            // videoRef.current.currentTime = resume?.canPlay ? resume?.time : 0;
            videoRef.current.play();
        }
    }, [resume, videoRef]);

    return (
        <>
            {showPlaceHolder && (
                <Image
                    className={clsx(
                        styles.placeholder_hover_image,
                        imageClassName
                    )}
                    src={muxData.imageURL}
                    alt=""
                    loading="eager"
                    placeholder={"blur"}
                    blurDataURL={imageDataURL}
                    style={{
                        aspectRatio,
                    }}
                    {...imageProps}
                    {...placeholderProps}
                />
            )}
            <MuxVideo
                className={className}
                key={id}
                ref={videoRef}
                streamType="on-demand"
                playbackId={playbackId}
                loop
                muted
                playsInline
                preload="auto"
                minResolution="480p"
                startTime={muxData.playerInitTime}
                style={{
                    aspectRatio,
                    backgroundColor: "var(--theme-placeholder-color)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url("{${imageURL}}")`,
                }}
                onCanPlay={() => setCanStart(true)}
                onClick={handleClick}
            />
        </>
    );
};

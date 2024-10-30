"use client";

import { FC, useCallback, useEffect, useId, useRef } from "react";

import MuxPlayer, {
  MuxPlayerProps,
  MuxPlayerRefAttributes,
} from "@mux/mux-player-react";
import clsx from "clsx";
import { colord } from "colord";
import { useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { MediaThemeElement } from "media-chrome/dist/media-theme-element.js";

import { useLayout } from "@/context/layout";
import { useTheme } from "@/context/theme";

import { ParalellTemplateProps, parallelTemplate } from "./parallel-template";
import styles from "./video-player.module.scss";

type UseVideoPlayerMuxProps = {
  options?: {
    smallScreenModeContain?: boolean;
    centerOnPlay?: boolean;
  };
  templateProps?: ParalellTemplateProps;
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
  templateProps,
}: UseVideoPlayerMuxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoEl = useRef<MuxPlayerRefAttributes>(null);
  const id = useId();
  const lenis = useLenis();
  const inView = useInView(containerRef);
  const { headerSize } = useLayout();

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
    if (videoElement && centerOnPlay && headerSize) {
      const videoRect = videoElement.getBoundingClientRect();
      const scrollToY =
        window.scrollY +
        videoRect.top +
        videoRect.height / 2 -
        window.innerHeight / 2 -
        headerSize?.height / 2;

      lenis?.scrollTo(scrollToY, { duration: 1 });
    }
  }, [videoEl, lenis, centerOnPlay, headerSize]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", toggleMediaObjectFitContain);
    return () => {
      document.removeEventListener(
        "fullscreenchange",
        toggleMediaObjectFitContain,
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
  templateProps,
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
    templateProps,
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={containerRef}
      className={clsx(styles.video_container, classNameProp)}
      style={{
        aspectRatio: aspectRatio ?? "auto",
      }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <MuxPlayer
        ref={videoEl}
        theme={"media-theme-tiny"}
        key={id}
        className={clsx(styles.player)}
        streamType="on-demand"
        playbackId={playbackId}
        style={playerStyle}
        primaryColor={primaryColor}
        secondaryColor="transparent"
        thumbnailTime={thumbnailTime ?? 0}
        preload="auto"
        playsInline
        onPlay={() => toggleMediaObjectFitContain()}
        onPause={() => toggleMediaObjectFitContain()}
        // loading="page"
        {...etc}
      />
    </div>
  );
};

"use client";

import { FC, useRef, useState } from "react";
import { useEffect } from "react";

import { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { asLink, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-item.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroItemProps> = ({ item }) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { display, project } = item;
    const { setItem } = useMegaHeroApi();
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const { isHovering } = useVideoStart({ videoRef, containerRef });

    useEffect(() => {
        if (isHovering) {
            setItem(item);
        } else {
            setItem(undefined);
        }
    }, [isHovering, item, setItem]);

    if (project && hasProjectData(project) && project.data?.video)
        return (
            <li
                className={clsx(
                    styles.item,
                    display === "horizontal" ? styles.h : styles.v
                )}
            >
                <PrismicNextLink field={project} ref={containerRef} prefetch>
                    <MuxPlayer
                        ref={(muxPlayerEl) =>
                            setVideoRef(muxPlayerEl?.media?.nativeEl)
                        }
                        streamType="on-demand"
                        playbackId={project.data.video}
                        loop
                        muted
                        style={{ aspectRatio: 16 / 9 }}
                    />
                </PrismicNextLink>
            </li>
        );
};

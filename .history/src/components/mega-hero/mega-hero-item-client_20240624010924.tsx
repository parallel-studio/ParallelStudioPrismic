"use client";

import { FC, useRef, useState } from "react";
import { useEffect } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = ({ item }) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { project } = item;
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

    if (project && hasProjectData(project) && project.data?.video) {
        return (
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
        );
    }
};

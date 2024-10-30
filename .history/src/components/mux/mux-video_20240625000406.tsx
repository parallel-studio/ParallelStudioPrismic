"use client";

import { FC, useRef, useState } from "react";
import { useEffect } from "react";

import { MuxPlayerProps } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";

type MegaHeroVideoProps = {
    config: MuxPlayerProps;
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroVideo: FC<MegaHeroVideoProps> = ({ config, item }) => {
    const { setItem } = useMegaHeroApi();
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const { isHovering } = useVideoStart({ videoRef });

    useEffect(() => {
        if (isHovering) {
            setItem(item);
        } else {
            setItem(undefined);
        }
    }, [isHovering, item, setItem]);

    const clientConfig = {
        ref: (muxPlayerEl: any) => setVideoRef(muxPlayerEl?.media?.nativeEl),
        streamType: "on-demand",
        loop: true,
        muted: true,
        ...config,
    };

    return <MuxPlayer {...config} />;
};

type MegaHeroItemDivProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
    muxData: MuxBlurUpResponse;
};

export const MegaHeroItemDiv: FC<MegaHeroItemDivProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { bypass_video } = item;
    const { blurDataURL, aspectRatio } = muxData;
    const { setItem } = useMegaHeroApi();
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const { isHovering } = useVideoStart({ videoRef });

    useEffect(() => {
        if (isHovering) {
            setItem(item);
        } else {
            setItem(undefined);
        }
    }, [isHovering, item, setItem]);

    if (bypass_video)
        return (
            <div ref={containerRef as any} style={{ aspectRatio }}>
                <MuxPlayer
                    ref={(muxPlayerEl) =>
                        setVideoRef(muxPlayerEl?.media?.nativeEl)
                    }
                    streamType="on-demand"
                    playbackId={bypass_video}
                    loop
                    muted
                    style={{ aspectRatio }}
                    placeholder={blurDataURL}
                />
            </div>
        );
};

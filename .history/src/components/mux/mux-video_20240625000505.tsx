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

    const clientConfig: MuxPlayerProps = {
        streamType: "on-demand",
        loop: true,
        muted: true,
        ...config,
    };

    return (
        <MuxPlayer
            ref={(muxPlayerEl: any) =>
                setVideoRef(muxPlayerEl?.media?.nativeEl)
            }
            {...clientConfig}
        />
    );
};

"use client";

import { FC, useRef, useState } from "react";
import { useEffect } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
    muxData: MuxBlurUpResponse;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const { project, bypass_video } = item;
    const { blurDataURL, aspectRatio } = muxData;
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

    return (
        <>
            {project &&
                hasProjectData(project) &&
                !bypass_video &&
                project.data?.video && (
                    <PrismicNextLink
                        field={project}
                        ref={containerRef}
                        prefetch
                        style={{ aspectRatio }}
                    >
                        <MuxPlayer
                            ref={(muxPlayerEl) =>
                                setVideoRef(muxPlayerEl?.media?.nativeEl)
                            }
                            streamType="on-demand"
                            playbackId={project.data.video}
                            loop
                            muted
                            style={{ aspectRatio }}
                            placeholder={blurDataURL}
                        />
                    </PrismicNextLink>
                )}
            {bypass_video && (
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
            )}
        </>
    );
};

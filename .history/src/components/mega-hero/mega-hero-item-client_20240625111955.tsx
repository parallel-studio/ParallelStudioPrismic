"use client";

import { FC, Fragment, useRef, useState } from "react";
import { useEffect } from "react";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { PrismicNextLink } from "@prismicio/next";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";
import { MuxBlurUpResponse } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { useMegaHeroApi } from "./context-hero";
import { useMegaHero } from "./useMegaHero";

type MegaHeroItemProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
    muxData: MuxBlurUpResponse;
};

export const MegaHeroItemClient: FC<MegaHeroItemProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef(null);
    const { project, bypass_video } = item;
    const { blurDataURL, aspectRatio } = muxData;
    const { setItem, item: activeItem } = useMegaHeroApi();
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();

    const { isHovering } = useVideoStart({ videoRef });

    useEffect(() => {
        if (isHovering) {
            setItem(item);
        } else if (isHovering === false && item === activeItem) {
            setItem(undefined);
        }
    }, [isHovering, item, setItem, activeItem]);

    useMegaHero({ sectionPinRef: containerRef, sectionToPinRef });

    return (
        <div style={{ aspectRatio }} ref={containerRef}>
            {project &&
                hasProjectData(project) &&
                !bypass_video &&
                project.data?.video && (
                    <PrismicNextLink
                        key={project.data.video}
                        field={project}
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
                
                    <MuxPlayer
                        key={bypass_video}
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
            )}
        </div>
    );
};
"use client";

import { FC, RefObject, useRef } from "react";
import React from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { hasProjectData } from "@/lib/helpers";

import { MuxLoading } from "../mux/mux-loading";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false, loading: () => <MuxLoading /> }
);

type MegaHeroItemProps = {
    item: ItemWithMuxData;
    container: RefObject<HTMLDivElement>;
};

export const MegaHeroItemClientMobile: FC<MegaHeroItemProps> = ({ item }) => {
    const itemContainer = useRef<HTMLDivElement>(null);
    const { project, bypass_video, muxData } = item;
    const aspectRatio = muxData?.aspectRatio;

    const { setIsPopupOpen } = useMegaHeroApi();

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    return (
        <div className={styles.item}>
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            {project &&
                hasProjectData(project) &&
                !bypass_video &&
                project.data?.video && (
                    <PrismicNextLink
                        key={project.data.video}
                        field={project}
                        prefetch
                        style={{ aspectRatio }}
                        aria-label={project.data.title as string}
                    >
                        <VideoOnHover
                            playbackId={project.data.video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            imageProps={{ loading: "eager" }}
                        />
                    </PrismicNextLink>
                )}
            {bypass_video && (
                <div
                    onClick={() => setIsPopupOpen(true)}
                    onKeyDown={(e) =>
                        e.key === "Enter" ? setIsPopupOpen(true) : undefined
                    }
                    aria-label="Showreel"
                    style={{
                        aspectRatio,
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <VideoOnHover
                        playbackId={bypass_video}
                        muxData={muxData}
                        containerRef={itemContainer}
                        imageProps={{ loading: "eager" }}
                    />
                </div>
            )}
        </div>
    );
};

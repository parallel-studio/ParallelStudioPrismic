"use client";

import { FC, RefObject, useRef } from "react";
import React from "react";

import { PrismicNextLink } from "@prismicio/next";
import dynamic from "next/dynamic";

import { hasProjectData } from "@/lib/helpers";

import { Play } from "../icons/play";
import { MuxLoading } from "../mux/mux-loading";
import { ItemWithMuxData } from ".";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";

const VideoOnHover = dynamic(
    () => import("../video/video-on-hover").then((mod) => mod.VideoOnHover),
    { ssr: false, loading: () => <MuxLoading /> }
);

type MegaHeroItemProps<T extends HTMLElement> = {
    item: ItemWithMuxData;
    container: RefObject<T>;
};

export const MegaHeroItemClientMobile: FC<MegaHeroItemProps<HTMLElement>> = ({
    item,
}) => {
    const itemContainer = useRef<HTMLDivElement>(null);
    const {
        project: projectProps,
        bypass_video,
        muxData,
        bypass_video_label_name,
    } = item;
    const aspectRatio = muxData?.aspectRatio;

    const { setIsPopupOpen } = useMegaHeroApi();

    const project = hasProjectData(projectProps)
        ? projectProps.data
        : undefined;
    const reelVideo = item.bypass_video ? item.muxData : undefined;
    const label = bypass_video_label_name ?? project?.title;

    return (
        <li className={styles.item}>
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}

            {!bypass_video && project?.video && (
                <PrismicNextLink
                    key={project.video}
                    className={styles.thumbnail_container}
                    field={projectProps}
                    prefetch
                    style={{ aspectRatio }}
                    aria-label={project.title as string}
                >
                    <div className={styles.video}>
                        {label && (
                            <div className={styles.item_title}>{label}</div>
                        )}
                        <VideoOnHover
                            playbackId={project.video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            imageProps={{ loading: "eager" }}
                        />
                    </div>
                </PrismicNextLink>
            )}
            {bypass_video && (
                <div
                    className={styles.thumbnail_container}
                    onClick={() => setIsPopupOpen(true)}
                    onKeyDown={(e) =>
                        e.key === "Enter" ? setIsPopupOpen(true) : undefined
                    }
                    aria-label={bypass_video_label_name ?? ""}
                    style={{
                        aspectRatio,
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.video}>
                        {label && (
                            <div className={styles.item_title}>
                                <span>
                                    {label}
                                    <Play style={{ height: "1.2em" }} />
                                </span>
                            </div>
                        )}
                        <VideoOnHover
                            playbackId={bypass_video}
                            muxData={muxData}
                            containerRef={itemContainer}
                            imageProps={{ loading: "eager" }}
                        />
                    </div>
                </div>
            )}
        </li>
    );
};

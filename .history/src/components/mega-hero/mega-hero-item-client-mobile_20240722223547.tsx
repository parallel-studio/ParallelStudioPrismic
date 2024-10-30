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

type MegaHeroItemProps<T extends HTMLElement> = {
    item: ItemWithMuxData;
    container: RefObject<T>;
};

export const MegaHeroItemClientMobile: FC<MegaHeroItemProps<HTMLElement>> = ({
    item,
}) => {
    const itemContainer = useRef<HTMLDivElement>(null);
    const { project, bypass_video, muxData, bypass_video_label_name } = item;
    const aspectRatio = muxData?.aspectRatio;

    const { setIsPopupOpen } = useMegaHeroApi();

    const reelVideo = item.bypass_video ? item.muxData : undefined;

    return (
        <li className={styles.item}>
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
                        {/* {project.data.title} */}
                        {project.data.title && (
                            <div className={styles.item_title}>
                                {project.data.title}
                            </div>
                        )}
                        <div className={styles.video}>
                            <VideoOnHover
                                playbackId={project.data.video}
                                muxData={muxData}
                                containerRef={itemContainer}
                                imageProps={{ loading: "eager" }}
                            />
                        </div>
                    </PrismicNextLink>
                )}
            {bypass_video && (
                <div
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
                    {/* {bypass_video_label_name} */}
                    {bypass_video_label_name && (
                        <div className={styles.item_title}>
                            {bypass_video_label_name}
                        </div>
                    )}
                    <div className={styles.video}>
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

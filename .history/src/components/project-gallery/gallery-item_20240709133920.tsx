"use server";
import { FC } from "react";

import clsx from "clsx";
import dynamic from "next/dynamic";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { MuxLoading } from "../mux/mux-loading";
import styles from "./gallery-item.module.scss";
import { KeyTextField, NumberField, isFilled } from "@prismicio/client";

const GalleryItemClient = dynamic(
    () => import("./gallery-item-client").then((mod) => mod.GalleryItemClient),
    {
        ssr: false,
        loading: () => <MuxLoading style={{ blockSize: "20svw" }} />,
    }
);

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

const getMuxData = async ({
    playbackId,
    time,
}: {
    playbackId: KeyTextField;
    time?: NumberField;
}) => {
    const defaultVideo = isFilled.keyText(playbackId) ? playbackId : undefined;

    const defaultVideoOptions = time ? { time } : undefined;

    const muxData_DefaultVideo = await getMuxBlurUp({
        muxPlaybackId: defaultVideo,
        options: defaultVideoOptions,
    });

    return muxData_DefaultVideo
        ? { playbackId: defaultVideo, ...muxData_DefaultVideo }
        : undefined;
};

export const GalleryItemServer: FC<GalleryItemProps> = async ({ item }) => {
    const { project, project_video } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const {
            video,
            video_alternative,
            video_thumbnail_time_bypass,
            video_short_alt_thumbnail_bypass,
        } = project.data;

        const defaultVideo = isFilled.keyText(video) ? video : undefined;

        const defaultVideoOptions = video_thumbnail_time_bypass
            ? { time: video_thumbnail_time_bypass }
            : undefined;

        const muxData_DefaultVideo = await getMuxBlurUp({
            muxPlaybackId: defaultVideo,
            options: defaultVideoOptions,
        });

        const muxData_DefaultVideo_with_PlaybackId = muxData_DefaultVideo
            ? { playbackId: defaultVideo, ...muxData_DefaultVideo }
            : undefined;

        const alternativeVideo = isFilled.keyText(video_alternative)
            ? video_alternative
            : undefined;

        const alternativeVideoOptions = video_thumbnail_time_bypass
            ? { time: video_short_alt_thumbnail_bypass as number }
            : undefined;

        const muxData_AlternativeVideo = await getMuxBlurUp({
            muxPlaybackId: alternativeVideo,
            options: alternativeVideoOptions,
        });

        const muxData_AlternativeVideo_with_PlaybackId =
            muxData_AlternativeVideo
                ? { playbackId: alternativeVideo, ...muxData_AlternativeVideo }
                : undefined;

        return (
            <li className={clsx(styles.item)}>
                <GalleryItemClient
                    item={item}
                    muxData_DefaultVideo={muxData_DefaultVideo_with_PlaybackId}
                    muxData_AlternativeVideo={
                        muxData_AlternativeVideo_with_PlaybackId
                    }
                />
            </li>
        );
    }
};

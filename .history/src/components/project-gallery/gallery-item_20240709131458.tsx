"use server";
import { FC } from "react";

import clsx from "clsx";
import dynamic from "next/dynamic";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { MuxLoading } from "../mux/mux-loading";
import styles from "./gallery-item.module.scss";
import { isFilled } from "@prismicio/client";

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

export const GalleryItemServer: FC<GalleryItemProps> = async ({ item }) => {
    const { project, project_video } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, video_alternative, video_thumbnail_time_bypass } =
            project.data;
        const options = video_thumbnail_time_bypass
            ? { time: video_thumbnail_time_bypass }
            : undefined;

        const muxData_DefaultVideo = await getMuxBlurUp({
            muxPlaybackId: isFilled.keyText(video) ? video : undefined,
            options,
        });

        const muxData_AlternativeVideo = await getMuxBlurUp({
            muxPlaybackId: isFilled.keyText(video_alternative)
                ? video_alternative
                : undefined,
            options,
        });

        return (
            <li className={clsx(styles.item)}>
                {muxData_DefaultVideo && (
                    <GalleryItemClient
                        item={item}
                        muxData_DefaultVideo={{
                            playbackId: video,
                            ...muxData_DefaultVideo,
                        }}
                        muxData_AlternativeVideo={{
                            playbackId: video_alternative,
                            ...muxData_AlternativeVideo,
                        }}
                    />
                )}
            </li>
        );
    }
};

"use server";
import { FC } from "react";

import clsx from "clsx";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import styles from "./mega-hero-item.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    const {
        project,
        bypass_video,
        bypass_video_thumbnail_time,
        project_video,
    } = item;
    if (project && hasProjectData(project)) {
        const { video, video_thumbnail_time_bypass, video_alternative } =
            project.data;

        const options =
            typeof video_thumbnail_time_bypass === "number"
                ? { time: video_thumbnail_time_bypass }
                : undefined;

        const muxPlaybackId =
            project_video === "default"
                ? (video as string)
                : video_alternative ?? "";

        const muxData = await getMuxBlurUp({
            muxPlaybackId,
            options,
        });

        if (muxData.blurDataURL && muxData.aspectRatio)
            return (
                <li className={clsx(styles.item, "carousel_item")}>
                    <MegaHeroItemClient item={item} muxData={muxData} />
                </li>
            );
    } else if (bypass_video) {
        const options =
            typeof bypass_video_thumbnail_time === "number"
                ? { time: bypass_video_thumbnail_time }
                : undefined;

        const muxData = await getMuxBlurUp({
            muxPlaybackId: bypass_video,
            options,
        });
        return (
            <li className={clsx(styles.item, "carousel_item")}>
                <MegaHeroItemClient item={item} muxData={muxData} />
            </li>
        );
    }
};

"use server";
import { FC } from "react";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import styles from "./mega-hero-item.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    const { project, bypass_video, bypass_video_thumbnail_time } = item;
    if (project && hasProjectData(project) && project.data?.video) {
        const { video, video_thumbnail_time_bypass } = project.data;
        const options = video_thumbnail_time_bypass
            ? { time: video_thumbnail_time_bypass }
            : undefined;

        const muxData = await getMuxBlurUp({
            muxPlaybackId: video,
            options,
        });
        return (
            <li className={styles.item}>
                <MegaHeroItemClient item={item} muxData={muxData} />
            </li>
        );
    } else if (bypass_video) {
        const options = bypass_video_thumbnail_time
            ? { time: bypass_video_thumbnail_time }
            : undefined;
        console.log(bypass_video, bypass_video_thumbnail_time, options);
        const muxData = await getMuxBlurUp({
            muxPlaybackId: bypass_video,
            options,
        });
        return (
            <li className={styles.item}>
                <MegaHeroItemClient item={item} muxData={muxData} />
            </li>
        );
    }
};

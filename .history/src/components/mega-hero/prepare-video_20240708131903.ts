import { Options } from "@mux/blurup";
import { isFilled } from "@prismicio/client";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

export const prepareVideoData = async (
    item: MegaHeroSliceDefaultPrimaryItemsItem
) => {
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

        const thumbnailTime = isFilled.number(video_thumbnail_time_bypass)
            ? video_thumbnail_time_bypass
            : 0;

        if (muxData)
            return {
                ...muxData,
                playbackId: muxPlaybackId,
                thumbnailTime,
            };
    } else if (bypass_video) {
        const options =
            typeof bypass_video_thumbnail_time === "number"
                ? { time: bypass_video_thumbnail_time }
                : undefined;

        const muxData = await getMuxBlurUp({
            muxPlaybackId: bypass_video,

            options,
        });

        const thumbnailTime = isFilled.number(bypass_video_thumbnail_time)
            ? bypass_video_thumbnail_time
            : 0;

        if (muxData)
            return {
                ...muxData,
                playbackId: bypass_video,
                thumbnailTime,
            };
    }
};

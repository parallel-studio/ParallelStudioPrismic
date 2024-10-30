import { Options } from "@mux/blurup";
import { isFilled } from "@prismicio/client";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

const OPTIONS: Options = {
    width: 750,
    height: 750,
};

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

        return await getMuxDataFromPrismic({
            playbackId: video,
            time: video_thumbnail_time_bypass,
        });
    } else if (bypass_video) {
        const options: Options = {
            time: bypass_video_thumbnail_time ?? 0,
            ...OPTIONS,
        };

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

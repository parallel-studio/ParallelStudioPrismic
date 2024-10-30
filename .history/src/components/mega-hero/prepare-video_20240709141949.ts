import { hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

export const prepareVideoData = async (
    item: MegaHeroSliceDefaultPrimaryItemsItem
) => {
    const { project, bypass_video, bypass_video_thumbnail_time, project_video } = item;

    if (project && hasProjectData(project)) {
        const { video, video_thumbnail_time_bypass, video_alternative, video_short_alt_thumbnail_bypass } = project.data;

const props = project_video === "default" ? {
    
}

        return await getMuxDataFromPrismic({
            playbackId: video,
            time: video_thumbnail_time_bypass,
        });
    } else if (bypass_video) {
        return await getMuxDataFromPrismic({
            playbackId: bypass_video,
            time: bypass_video_thumbnail_time,
        });
    }
};

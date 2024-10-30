import { hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

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
        const {
            video,
            video_thumbnail_time_bypass,
            video_alternative,
            video_short_alt_thumbnail_bypass,
        } = project.data;

        const props =
            project_video === "default"
                ? {
                      playbackId: video,
                      time: video_thumbnail_time_bypass,
                  }
                : {
                      playbackId: video_alternative,
                      time: video_short_alt_thumbnail_bypass,
                  };

        return await getMuxDataFromPrismic(props);
    } else if (bypass_video) {
        return await getMuxDataFromPrismic({
            playbackId: bypass_video,
            time: bypass_video_thumbnail_time,
        });
    }
};

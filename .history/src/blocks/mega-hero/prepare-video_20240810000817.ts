import { hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

export const prepareVideoData = async (
    item: MegaHeroSliceDefaultPrimaryItemsItem
) => {
    const { project, bypass_video, placeholder_timestamp, project_video } =
        item;

    if (project && hasProjectData(project)) {
        const { video, video_alternative } = project.data;

        const props =
            project_video === "default"
                ? {
                      playbackId: video,
                      time: placeholder_timestamp,
                  }
                : {
                      playbackId: video_alternative,
                      time: placeholder_timestamp,
                  };

        return await getMuxDataFromPrismic(props);
    } else if (bypass_video) {
        return await getMuxDataFromPrismic({
            playbackId: bypass_video,
            time: placeholder_timestamp,
        });
    }
};

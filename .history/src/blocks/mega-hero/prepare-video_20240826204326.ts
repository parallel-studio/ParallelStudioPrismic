import { hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { Options } from "@mux/blurup";

const OPTIONS: Options = {
    quality: 100,
};
export const prepareVideoData = async (
    item: MegaHeroSliceDefaultPrimaryItemsItem
) => {
    const { project, bypass_video, timestamp_start, project_video } = item;

    if (project && hasProjectData(project)) {
        const { video, video_alternative } = project.data;

        const props =
            project_video === "default"
                ? {
                      playbackId: video,
                      time: timestamp_start,
                  }
                : {
                      playbackId: video_alternative,
                      time: timestamp_start,
                  };

        return await getMuxDataFromPrismic(props);
    } else if (bypass_video) {
        return await getMuxDataFromPrismic({
            playbackId: bypass_video,
            time: timestamp_start,
        });
    }
};

import { FC } from "react";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

import { ProjectGalleryItemClient } from "./item-client";
import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "@/types";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const ProjectGalleryItemServer: FC<GalleryItemProps> = async ({
    item,
}) => {
    const { project, timestamp_start } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, video_alternative } = project.data;

        const defaultVideo = await getMuxDataFromPrismic({
            playbackId: video,
            time: timestamp_start,
            options: {
                width: 1920,
                height: 1080,
            },
        });

        const alternativeVideo = await getMuxDataFromPrismic({
            playbackId: video_alternative,

            time: timestamp_start,
        });

        return (
            <ProjectGalleryItemClient
                item={item}
                muxData_DefaultVideo={defaultVideo}
                muxData_AlternativeVideo={alternativeVideo}
            />
        );
    }
};

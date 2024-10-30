import { FC } from "react";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ProjectGalleryItemClient } from "./item/project-gallery-item-client";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItem: FC<GalleryItemProps> = async ({ item }) => {
    const { project } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const {
            video,
            video_alternative,
            video_thumbnail_time_bypass,
            video_short_alt_thumbnail_bypass,
        } = project.data;

        const defaultVideo = await getMuxDataFromPrismic({
            playbackId: video,
            time: video_thumbnail_time_bypass,
        });

        const alternativeVideo = await getMuxDataFromPrismic({
            playbackId: video_alternative,

            time: video_short_alt_thumbnail_bypass,
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

"use server";
import { FC } from "react";

import dynamic from "next/dynamic";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxDataFromPrismic } from "@/lib/mux-data-prismic";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { MuxLoading } from "../mux/mux-loading";

const GalleryItemClient = dynamic(
    () => import("./gallery-item-client").then((mod) => mod.GalleryItemClient),
    {
        ssr: false,
        loading: () => <MuxLoading style={{ blockSize: "20svw" }} />,
    }
);

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const GalleryItemServer: FC<GalleryItemProps> = async ({ item }) => {
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
            // <GalleryItemClient
            //     item={item}
            //     muxData_DefaultVideo={defaultVideo}
            //     muxData_AlternativeVideo={alternativeVideo}
            // />
            <div
                style={{
                    blockSize: "150px",
                    inlineSize: "300",
                    backgroundColor: "red",
                }}
            ></div>
        );
    }
};

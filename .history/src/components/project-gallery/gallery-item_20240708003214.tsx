"use server";
import { FC } from "react";

import clsx from "clsx";
import dynamic from "next/dynamic";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { MuxLoading } from "../mux/mux-loading";
import styles from "./gallery-item.module.scss";

const GalleryItemClient = dynamic(
    () => import("./gallery-item-client").then((mod) => mod.GalleryItemClient),
    {
        ssr: false,
        loading: () => <MuxLoading style={{ blockSize: "20svw" }} />,
    }
);

type GalleryItemProps = {
    videoId: string;
    videoThumbnailBypass?: number;
};

export const GalleryItemServer: FC<GalleryItemProps> = async ({
    videoId,
    videoThumbnailBypass,
}) => {
    const { project, project_video } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, video_alternative, video_thumbnail_time_bypass } =
            project.data;
        const options = videoThumbnailBypass
            ? { time: videoThumbnailBypass }
            : undefined;

        const muxData = await getMuxBlurUp({
            muxPlaybackId:
                project_video === "default"
                    ? (video as string)
                    : (video_alternative as string),
            options,
        });

        return (
            <li className={clsx(styles.item)}>
                {muxData && <GalleryItemClient item={item} muxData={muxData} />}
            </li>
        );
    }
};

"use server";
import { FC, Suspense } from "react";

import clsx from "clsx";
import dynamic from "next/dynamic";

import { defaultColor } from "@/context/theme";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { ImageLoading } from "../image/image-loading";
import { MuxLoading } from "../mux/mux-loading";
import { WithSuspenseComponent } from "../with-suspense-component";
import styles from "./gallery-item.module.scss";

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

export const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
    const { project, project_video } = item;

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, video_alternative, video_thumbnail_time_bypass } =
            project.data;
        const options = video_thumbnail_time_bypass
            ? { time: video_thumbnail_time_bypass }
            : undefined;

        const muxData = await getMuxBlurUp({
            muxPlaybackId:
                project_video === "default"
                    ? (video as string)
                    : (video_alternative as string),
            options,
        });

        return (
            <WithSuspenseComponent loading>
                <ImageLoading
                    style={{ aspectRatio: muxData.aspectRatio }}
                    loadingOptions={{
                        color: project.data.color ?? defaultColor,
                    }}
                />
            </WithSuspenseComponent>
        );
    }
};
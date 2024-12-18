"use client";
import { FC, useRef } from "react";
import ReactPlayer from "react-player";

import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    display: string;
};

const GalleryItem: FC<GalleryItemProps> = ({ item, display }) => {
    const { project } = item;

    const video = hasProjectData(project) ? project.data.video : undefined;

    const videoRef = useRef<HTMLAnchorElement>(null);
    const { isHovering } = useVideoStart({ ref: videoRef });

    return (
        <li
            className={clsx(
                styles.item,
                display === "horizontal" ? styles.h : styles.v
            )}
        >
            <PrismicNextLink field={project} ref={videoRef}>
                {video && (
                    <ReactPlayer
                        key={"video"}
                        url={asLink(video) as any}
                        loop
                        width={"100%"}
                        height={"100%"}
                        playing={isHovering}
                        muted
                    />
                )}
            </PrismicNextLink>
        </li>
    );
};

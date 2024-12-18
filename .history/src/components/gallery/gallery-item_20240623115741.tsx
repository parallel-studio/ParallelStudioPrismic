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
    display?: "horizontal" | "vertical";
};

export const GalleryItem: FC<GalleryItemProps> = ({
    item,
    display = "horizontal",
}) => {
    const videoRef = useRef<HTMLAnchorElement>(null);
    const { isHovering } = useVideoStart({ ref: videoRef });
    const { project } = item;

    if (hasProjectData(project)) {
        const video = hasProjectData(project) ? project.data.video : undefined;

        return (
            <li className={clsx(styles.item, display)}>
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

                    <div>{}</div>
                </PrismicNextLink>
            </li>
        );
    }
};

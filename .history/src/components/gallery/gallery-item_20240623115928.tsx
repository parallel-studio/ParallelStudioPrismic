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
import css from "styled-jsx/css";

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
    const { className, styles: styleds } = css.resolve`
        div {
            color: ${theme?.color};
        }
    `;

    if (hasProjectData(project)) {
        const { video, title, description } = project.data;

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

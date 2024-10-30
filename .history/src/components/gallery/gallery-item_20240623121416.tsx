"use client";
import { FC, useRef } from "react";
import ReactPlayer from "react-player";

import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import css from "styled-jsx/css";

import { useTheme } from "@/context/theme";
import { useVideoStart } from "@/hooks/useVideoStart";
import { hasClientData, hasProjectData } from "@/lib/helpers";

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
    const { theme } = useTheme();

    if (hasProjectData(project) && hasClientData(project.data.client)) {
        const { video, title, description, color } = project.data;
        const { className, styles: styleds } = css.resolve`
            div {
                color: ${color};
            }
        `;

        console.log(project.data);
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
                </PrismicNextLink>
                <div className={styles.info}>
                    <div className={clsx(styles.tag, className)}>
                        {project.data.client.data.name} {styleds}
                    </div>
                    <div className={styles.client}>{title}</div>
                </div>
            </li>
        );
    }
};

"use client";
import { FC, ReactNode, useRef, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

import { useVideoStart } from "@/hooks/useVideoStart";
import { hasClientData, hasProjectData } from "@/lib/helpers";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import styles from "./gallery-item.module.scss";
import { GalleryItemClient } from "./gallery-item-client";

type GalleryItemProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    display?: "horizontal" | "vertical";
};

export const GalleryItem: FC<GalleryItemProps> = ({
    item,
    display = "horizontal",
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>();
    const { isHovering } = useVideoStart({ videoRef, containerRef });
    const { project } = item;

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, description, color } = project.data;
        const { className, styles: styleds } = css.resolve`
            div {
                span {
                    color: ${color};
                }
            }
        `;

        return (
            <li className={clsx(styles.item, display)}>
                <GalleryItemClient item={item} />
            </li>
        );
    }
};

"use client";
import { FC, useRef } from "react";

import clsx from "clsx";

import { useVideoStart } from "@/hooks/useVideoStart";

import styles from "./gallery-item.module.scss";

type GalleryItemProps = {
    item: string;
};

const GalleryItem: FC<GalleryItemProps> = ({}) => {
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
                {"url" in video && (
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
                {"url" in video === false && (
                    <PrismicNextImage key={"image"} field={image} alt="" />
                )}
            </PrismicNextLink>
        </li>
    );
};

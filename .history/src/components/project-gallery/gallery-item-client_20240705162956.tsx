"use client";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import { defaultColor, useTheme } from "@/context/theme";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
import { useLayout } from "@/lib/mobile-layout";
import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "../../../prismicio-types";
import { Title } from "../title/title";
import { VideoOnHover } from "../video/video-on-hover";
import styles from "./gallery-item.module.scss";

type GalleryItemClientProps = {
    item: ProjectGallerySliceDefaultPrimaryProjectsItem;
    muxData: ReturnTypeGetMuxBlurUp;
};

export const GalleryItemClient: FC<GalleryItemClientProps> = ({
    item,
    muxData,
}) => {
    const containerRef = useRef<HTMLAnchorElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { project } = item;
    const { isMobileLayoutActive } = useLayout();
    const { setTheme } = useTheme();

    const handleTheme = useCallback(() => {
        if (hasProjectData(project)) {
            const color = project.data.color as string;
            setTheme({ color });
        } else {
            setTheme({ color: defaultColor });
        }
    }, [project, setTheme]);

    const handleResize = useCallback(() => {
        const clientWidth = containerRef?.current?.clientWidth;
        const titleElement = titleRef?.current;
        if (clientWidth && titleElement) {
            const hiddenWidth = titleElement.offsetWidth - clientWidth;
            if (hiddenWidth < 0) {
            }
        }
    }, [containerRef, titleRef]);

    useIsomorphicLayoutEffect(() => {
        handleResize();
        window?.addEventListener("resize", handleResize);
        return () => {
            window?.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    if (
        hasProjectData(project) &&
        hasClientData(project.data.client) &&
        project.data?.video
    ) {
        const { video, title, color, client } = project.data;

        const projectClient = isFilled.keyText(client.data.name)
            ? client.data.name
            : undefined;
        const projectTitle = isFilled.keyText(title) ? title : undefined;
        const projectColor = isFilled.color(color) ? color : undefined;

        return (
            <PrismicNextLink
                field={project}
                ref={containerRef}
                onMouseOver={() => handleTheme()}
                prefetch
            >
                <div className={styles.video_container}>
                    {video && (
                        <VideoOnHover
                            playbackId={video}
                            containerRef={containerRef}
                            muxData={muxData}
                            placeholder={{ fill: true }}
                        />
                    )}
                </div>
                <div className={styles.info}>
                    <Title
                        ref={titleRef}
                        title={projectClient}
                        description={projectTitle}
                        color={projectColor}
                    />
                </div>
            </PrismicNextLink>
        );
    }
};

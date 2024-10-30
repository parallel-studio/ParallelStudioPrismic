"server only";
import { FC } from "react";

import clsx from "clsx";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import styles from "./mega-hero-item.module.scss";
import { MegaHeroItemClient } from "./mega-hero-item-client";

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItemContainer: FC<MegaHeroContainerProps> = async ({
    item,
}) => {
    const { display, project } = item;
    if (project && hasProjectData(project) && project.data?.video) {
        const muxBlur = await getMuxBlurUp({
            muxPlaybackId: project.data.video,
        });
        console.log(muxBlur);
        return (
            <li
                className={clsx(
                    styles.item,
                    display === "horizontal" ? styles.h : styles.v
                )}
            >
                <MegaHeroItemClient item={item} />
            </li>
        );
    }
};

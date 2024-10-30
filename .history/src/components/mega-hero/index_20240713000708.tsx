"server only";

import { FC } from "react";

import { isFilled } from "@prismicio/client";

import {
    MegaHeroSlice,
    MegaHeroSliceDefaultPrimaryItemsItem,
} from "../../../prismicio-types";
import { MegaHeroCarouselGsap } from "./mega-hero-carousel-gsap";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaCarouselOld } from "./mega-hero-carousel copy";
import { MegaHeroHeader } from "./mega-hero-header";
import { prepareVideoData } from "./prepare-video";
import { hasClientData, hasProjectData } from "@/lib/helpers";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export type ItemWithMuxData = MegaHeroSliceDefaultPrimaryItemsItem & {
    muxData: Awaited<ReturnType<typeof prepareVideoData>>;
};

export const MegaHeroComponent: FC<MegaHeroProps> = async ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;

    const muxData = await Promise.all(
        items?.map(async (item) => await prepareVideoData(item))
    );

    const itemsWithMuxData = items.map((item, index) => ({
        ...item,
        muxData: muxData[index],
    }));

    const clientLength = items.map((item) =>
        hasProjectData(item.project)
            ? hasClientData(item.project.data.client)
                ? isFilled.keyText(item.project.data.client.data.name)
                    ? item.project.data.client.data.name.length
                    : 0
                : 0
            : 0
    );

    const maxLength = Math.max(...clientLength);

    const placeholder =
        isFilled.link(link) && isFilled.keyText(link_label)
            ? { link, link_label }
            : undefined;

    return (
        <MegaHeroProvider clientLength={maxLength}>
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <MegaHeroCarouselGsap
                    items={itemsWithMuxData}
                    placeholder={placeholder}
                />
            </div>
        </MegaHeroProvider>
    );
};

"server only";

import { FC } from "react";

import { isFilled } from "@prismicio/client";

import {
    MegaHeroSlice,
    MegaHeroSliceDefaultPrimaryItemsItem,
} from "../../../prismicio-types";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { prepareVideoData } from "./prepare-video";
import { MegaCarouselOld } from "./mega-hero-carousel copy";

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

    const placeholder =
        isFilled.link(link) && isFilled.keyText(link_label)
            ? { link, link_label }
            : undefined;

    return (
        <MegaHeroProvider>
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <MegaCarouselOld
                    items={itemsWithMuxData}
                    placeholder={placeholder}
                />
            </div>
        </MegaHeroProvider>
    );
};

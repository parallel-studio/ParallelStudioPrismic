"server only";

import { FC } from "react";

import { isFilled } from "@prismicio/client";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import {
    MegaHeroSlice,
    MegaHeroSliceDefaultPrimaryItemsItem,
} from "../../../prismicio-types";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";
import { prepareVideoData } from "./prepare-video";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export type ItemWithMuxData = MegaHeroSliceDefaultPrimaryItemsItem & {
    muxData: ReturnTypeGetMuxBlurUp;
};

export const MegaHeroComponent: FC<MegaHeroProps> = async ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;

    const reelVideo = items[0] ? await prepareVideoData(items[0]) : undefined;

    const muxData = await Promise.all(
        items?.map(async (item) => await prepareVideoData(item))
    );

    const itemsWithMuxData: ItemWithMuxData[] = items.map((item, index) => ({
        ...item,
        muxData: muxData[index],
    }));

    const placeholder =
        isFilled.link(link) && isFilled.keyText(link_label)
            ? { link, link_label }
            : undefined;

    return (
        <MegaHeroProvider>
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <MegaCarousel
                        items={itemsWithMuxData}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </MegaHeroProvider>
    );
};

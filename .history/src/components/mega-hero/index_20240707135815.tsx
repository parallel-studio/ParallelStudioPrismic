"server only";

import { FC } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import {
    MegaHeroSlice,
    MegaHeroSliceDefaultPrimaryItemsItem,
} from "../../../prismicio-types";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaCarousel } from "./mega-hero-carousel";
import { MegaHeroCarouselWrapper } from "./mega-hero-carousel-wrapper";
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

    return (
        <MegaHeroProvider>
            {reelVideo && <MegaHeroVideoFullScreen video={reelVideo} />}
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <MegaHeroCarouselWrapper>
                        <MegaCarousel
                            items={itemsWithMuxData}
                            placeholder={
                                    link,
                                    link_label,
                                
                            }
                        />
                    </MegaHeroCarouselWrapper>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

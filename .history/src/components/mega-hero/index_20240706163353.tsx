"server only";

import { FC } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { ReturnTypeGetMuxBlurUp } from "@/lib/mux-blur";

import {
    MegaHeroSlice,
    MegaHeroSliceDefaultPrimaryItemsItem,
} from "../../../prismicio-types";
import {
    VideoFullScreen,
    VideoFullScreenProps,
} from "../video/video-full-screen";
import { VideoPlayerMuxProps } from "../video/video-player";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroCarousel } from "./mega-hero-carousel";
import { MegaHeroCarousel__M } from "./mega-hero-carousel-wrapper";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";
import { prepareVideoData } from "./prepare-video";
import { MegaCarouselContainer } from "./mega-hero-carousel-motion";

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

    const reelProps: VideoPlayerMuxProps = {
        playbackId: reelVideo?.playbackId ?? "",
        muxBlur: reelVideo,
        theme: "minimal",
        variant: "playing-contain",
    };

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
                    <MegaHeroCarousel__M
                        placeholder={
                            <div
                                className={clsx(styles.end, styles.placeholder)}
                            >
                                <PrismicNextLink
                                    key={"end"}
                                    field={link}
                                    className={clsx(styles.end)}
                                    prefetch
                                    aria-label={link_label as string}
                                >
                                    <span>{link_label}</span>
                                </PrismicNextLink>
                            </div>
                        }
                        items={itemsWithMuxData}
                    >
                        <MegaCarouselContainer items={itemsWithMuxData} />
                    </MegaHeroCarousel__M>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

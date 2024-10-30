"server only";

import { FC } from "react";

import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { SmoothScrolling } from "@/lib/lenis";

import { MegaHeroSlice } from "../../../prismicio-types";
import { MegaHeroProvider } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroInfo } from "./mega-hero-info";
import { MegaHeroItem } from "./mega-hero-item";
import { MegaHeroVideoFullScreen } from "./mega-hero-video-full-screen";
import { prepareVideoData } from "./prepare-video";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

type ItemWithMuxData = MegaHeroSlice["primary"]["items"][0] & { muxData: any };

export const MegaHeroComponent: FC<MegaHeroProps> = async ({ slice }) => {
    const {
        primary: { slogan, items, link, link_label },
    } = slice;

    const reelVideo = items[0] ? await prepareVideoData(items[0]) : undefined;

    const muxData = await Promise.all(
        items?.map(async (item) => await prepareVideoData(item))
    );

    const itemsWithMuxData = items.map((item, index) => ({
        ...item,
        muxData: muxData[index],
    }));

    return (
        <MegaHeroProvider>
            {reelVideo && (
                <MegaHeroVideoFullScreen
                    playbackId={reelVideo.playbackId}
                    aspectRatio={reelVideo.aspectRatio}
                    blurDataURL={reelVideo.blurDataURL}
                    thumbnailTime={reelVideo.thumbnailTime}
                />
            )}
            <div className={styles.mega}>
                <MegaHeroHeader slogan={slogan} />
                <div>
                    <MegaHeroInfo />
                    <MegaHeroCarousel
                        placeholder={
                            <div
                                className={clsx(styles.end, styles.placeholder)}
                            >
                                <span>{link_label}</span>
                            </div>
                        }
                        items={items}
                    >
                        {items.map((item, index) => (
                            <MegaHeroItem key={index} item={item} />
                        ))}
                        <li>
                            <PrismicNextLink
                                key={"end"}
                                field={link}
                                className={clsx(styles.end)}
                                prefetch
                                aria-label={link_label as string}
                            ></PrismicNextLink>
                        </li>
                    </MegaHeroCarousel>
                </div>
            </div>
        </MegaHeroProvider>
    );
};

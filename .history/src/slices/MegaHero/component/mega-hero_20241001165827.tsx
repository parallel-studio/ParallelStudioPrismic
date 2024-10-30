import { FC } from "react";

import { isFilled } from "@prismicio/client";

import { hasClientData, hasProjectData } from "@/lib/helpers";
import { MegaHeroSlice, MegaHeroSliceDefaultPrimaryItemsItem } from "@/types";

import { MegaHeroProvider } from "./context";
import { MegaHeroCarousel } from "./mega-hero-carousel";
import { MegaHeroHeader } from "./mega-hero-header";
import { MegaHeroWrapper } from "./mega-hero-wrapper";
import { prepareVideoData } from "./prepare-video";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export type ItemWithMuxData = MegaHeroSliceDefaultPrimaryItemsItem & {
    muxData: Awaited<ReturnType<typeof prepareVideoData>>;
};

export const MegaHero: FC<MegaHeroProps> = async ({ slice }) => {
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
            <MegaHeroWrapper>
                <MegaHeroHeader slogan={slogan} />
                <MegaHeroCarousel
                    items={itemsWithMuxData}
                    placeholder={placeholder}
                />
            </MegaHeroWrapper>
        </MegaHeroProvider>
    );
};

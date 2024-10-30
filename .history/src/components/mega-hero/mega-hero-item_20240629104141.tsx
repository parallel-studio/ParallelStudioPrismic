"use server";
import { FC } from "react";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { prepareVideoData } from "./prepare-video";

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    const muxData = await prepareVideoData(item);
    if (muxData?.blurDataURL && muxData.aspectRatio)
        return <MegaHeroItemClient item={item} muxData={muxData} />;
};

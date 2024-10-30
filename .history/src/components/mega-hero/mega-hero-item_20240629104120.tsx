"use server";
import { FC } from "react";

import { hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { MegaHeroItemClient } from "./mega-hero-item-client";

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    const muxData = await prepareVideoData(item);
    if (muxData?.blurDataURL && muxData.aspectRatio)
        return <MegaHeroItemClient item={item} muxData={muxData} />;
};

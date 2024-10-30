"use server";
import { FC } from "react";

import dynamic from "next/dynamic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { prepareVideoData } from "./prepare-video";

const GalleryItemClient = dynamic(
    () => import("./gallery-item-client").then((mod) => mod.GalleryItemClient),
    {
        ssr: false,
        loading: () => <MuxLoading style={{ blockSize: "20svw" }} />,
    }
);

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    const muxData = await prepareVideoData(item);
    if (muxData?.blurDataURL && muxData.aspectRatio)
        return <MegaHeroItemClient item={item} muxData={muxData} />;
};

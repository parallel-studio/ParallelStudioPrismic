"use server";
import { FC } from "react";

import dynamic from "next/dynamic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { prepareVideoData } from "./prepare-video";
import { MuxLoading } from "../mux/mux-loading";

const MegaHeroItemClient = dynamic(
    () =>
        import("./mega-hero-item-client").then((mod) => mod.MegaHeroItemClient),
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

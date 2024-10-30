"use client";
import { FC } from "react";

import dynamic from "next/dynamic";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";
import { MuxLoading } from "../mux/mux-loading";
import { prepareVideoData } from "./prepare-video";

const MegaHeroItemClient = dynamic(
    () =>
        import("./mega-hero-item-client").then((mod) => mod.MegaHeroItemClient),
    {
        ssr: false,
        loading: () => <MuxLoading />,
    }
);

type MegaHeroContainerProps = {
    item: MegaHeroSliceDefaultPrimaryItemsItem;
};

export const MegaHeroItem: FC<MegaHeroContainerProps> = async ({ item }) => {
    // const muxData = await prepareVideoData(item);
    // if (muxData?.blurDataURL && muxData.aspectRatio)
    // return <MegaHeroItemClient item={item} muxData={muxData} />;
    return <MegaHeroItemClient item={item} />;
};

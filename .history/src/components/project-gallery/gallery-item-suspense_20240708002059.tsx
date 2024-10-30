"use server";
import { FC, ReactNode, Suspense } from "react";

import clsx from "clsx";

import { defaultColor } from "@/context/theme";
import { hasClientData, hasProjectData } from "@/lib/helpers";
import { getMuxBlurUp } from "@/lib/mux-blur";

import { ImageLoading } from "../image/image-loading";
import styles from "./gallery-item.module.scss";

type GalleryItemSuspenseProps = {
    children: ReactNode;
};

export const GalleryItemSuspense: FC<GalleryItemSuspenseProps> = ({
    children,
}) => {
    return (
        <Suspense
            fallback={
                <ImageLoading
                    style={{ aspectRatio: muxData.aspectRatio }}
                    loadingOptions={{
                        color: project.data.color ?? defaultColor,
                    }}
                />
            }
        >
            <GalleryItemClient item={item} muxData={muxData} />
        </Suspense>
    );
};

"use server";
import { FC, ReactElement, ReactNode, Suspense } from "react";

import { defaultColor } from "@/context/theme";

import { ImageLoading } from "../image/image-loading";
import styles from "./gallery-item.module.scss";

type WithSuspenseComponentProps = {
    children: ReactNode;
    fallback?: ReactElement;
};

export const WithSuspenseComponent: FC<WithSuspenseComponentProps> = ({
    children,
    fallback,
}) => {
    return (
        <Suspense
            fallback={
                <ImageLoading
                    className={styles.item}
                    style={{ aspectRatio: muxData.aspectRatio }}
                    loadingOptions={{
                        color: project.data.color ?? defaultColor,
                    }}
                />
            }
        >
            {children}
        </Suspense>
    );
};

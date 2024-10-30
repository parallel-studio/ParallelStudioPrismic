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
                fallback ?? (
                    <ImageLoading
                        style={{ blockSize: "100%", inlineSize: "100%" }}
                        loadingOptions={{
                            color: defaultColor,
                        }}
                    />
                )
            }
        >
            {children}
        </Suspense>
    );
};

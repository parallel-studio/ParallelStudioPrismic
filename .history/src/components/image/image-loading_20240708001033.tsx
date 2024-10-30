import { CSSProperties, FC, Suspense } from "react";

import {
    ImageServerComponent,
    ImageServerComponentProps,
} from "./image-server";

type LoadingOptions = {
    color?: CSSProperties["backgroundColor"];
};

type ImageLoadingProps = {
    className?: string;
    style?: CSSProperties;
    loadingOptions?: LoadingOptions;
};

export const ImageLoading: FC<ImageLoadingProps> = ({
    className,
    style,
    loadingOptions,
}) => {
    return (
        <div
            className={className}
            style={{
                backgroundColor: loadingOptions?.color ?? "black",
                ...style,
            }}
        ></div>
    );
};

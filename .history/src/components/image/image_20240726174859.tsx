import { Suspense } from "react";

import { ImageLoading, LoadingOptions } from "./image-loading";
import {
    ImageServerComponent,
    ImageServerComponentProps,
} from "./image-server";

type ImageComponentProps = ImageServerComponentProps & {
    loadingOptions?: LoadingOptions;
};

export const ImageComponent = (props: ImageComponentProps) => {
    return (
        <Suspense
            fallback={<ImageLoading loadingOptions={props.loadingOptions} />}
        >
            <ImageServerComponent {...props} />
        </Suspense>
    );
};

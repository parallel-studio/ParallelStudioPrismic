import { Suspense } from "react";

import { ImageLoading, ImageLoadingProps } from "./image-loading";
import {
    ImageServerComponent,
    ImageServerComponentProps,
} from "./image-server";

type ImageComponentProps = ImageServerComponentProps & {
    loadingOptions?: ImageLoadingProps;
};

export const ImageComponent = (props: ImageComponentProps) => {
    const { loadingOptions, ...serverProps } = props;
    return (
        <Suspense fallback={<ImageLoading {...loadingOptions} />}>
            <ImageServerComponent {...serverProps} />
        </Suspense>
    );
};

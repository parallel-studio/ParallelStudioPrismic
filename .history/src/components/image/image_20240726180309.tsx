import { Suspense } from "react";

import { ImageLoading, ImageLoadingProps } from "./image-loading";
import {
    ImageServerComponent,
    ImageServerComponentProps,
} from "./image-server";

type ImageComponentProps = ImageServerComponentProps & {
    loadingProps?: ImageLoadingProps;
};

export const ImageComponent = (props: ImageComponentProps) => {
    const { loadingProps: loadingOptions, ...serverProps } = props;
    return (
        <Suspense fallback={<ImageLoading {...loadingOptions} />}>
            <ImageServerComponent {...serverProps} />
        </Suspense>
    );
};

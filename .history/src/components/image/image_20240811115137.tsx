import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";

import { getPlaceholder } from "@/lib/placeholder";

export type ImageComponentProps = PrismicNextImageProps;

export const ImageComponent = async ({
    field,
    style,
    ...rest
}: ImageComponentProps) => {
    if (!field?.url) return <></>;

    return (
        <PrismicNextImage
            field={field}
            style={{
                transition: "opacity 0.3s cubic-bezier(0.3, 0.2, 0.2, 0.8)",
                backgroundColor: "var(--theme-placeholder-color)",
                ...style,
            }}
            fallbackAlt=""
            placeholder="empty"
            {...rest}
        />
    );
};

import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";

import { getPlaceholder } from "@/lib/placeholder";

export type ImageServerComponentProps = PrismicNextImageProps;

export const ImageServerComponent = async ({
    field,
    style,
    ...rest
}: ImageServerComponentProps) => {
    if (!field?.url) return <></>;

    // const { url } = field;

    // const placeholder = await getPlaceholder({
    //     src: url,
    // });

    return (
        <PrismicNextImage
            field={field}
            style={{
                transition: "opacity 0.3s cubic-bezier(0.3, 0.2, 0.2, 0.8)",
                ...style,
            }}
            fallbackAlt=""
            // placeholder="blur"
            // blurDataURL={placeholder?.base64}
            {...rest}
        />
    );
};

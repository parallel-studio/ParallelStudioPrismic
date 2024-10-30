import { CSSProperties, FC, HTMLAttributes } from "react";

export type LoadingOptions = CSSProperties["backgroundColor"];

type ImageLoadingProps = HTMLAttributes<HTMLDivElement>;

export const ImageLoading: FC<ImageLoadingProps> = ({
    className,
    style,
    ...restAttributes
}) => {
    return (
        <div
            className={className}
            style={{
                backgroundColor: loadingOptions?.color ?? "black",
                ...style,
            }}
            {...restAttributes}
        ></div>
    );
};

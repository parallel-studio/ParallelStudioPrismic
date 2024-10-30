import { CSSProperties, FC, HTMLAttributes } from "react";

export type LoadingOptions = CSSProperties["backgroundColor"];

type ImageLoadingProps = HTMLAttributes<HTMLDivElement>;

export const ImageLoading: FC<ImageLoadingProps> = ({
    className,
    style,
    ...restAttributes
}) => {
    const styleProps = style ?? {};
    const { backgroundColor: backgroundColorProp, ...restStyle } = styleProps;
    const backgroundColor = backgroundColorProp ?? "black";

    return (
        <div
            style={{
                backgroundColor,
                ...restStyle,
            }}
            {...restAttributes}
        ></div>
    );
};

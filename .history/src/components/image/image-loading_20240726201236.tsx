import { FC, HTMLAttributes } from "react";

export type ImageLoadingProps = HTMLAttributes<HTMLDivElement>;

export const ImageLoading: FC<ImageLoadingProps> = ({
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
import { FC, HTMLAttributes } from "react";

export type ImageLoadingProps = HTMLAttributes<HTMLDivElement>;

export const ImageLoading: FC<ImageLoadingProps> = ({
  style,
  ...restAttributes
}) => {
  const styleProps = style ?? {};
  const { backgroundColor: backgroundColorProp, ...restStyle } = styleProps;
  const backgroundColor = backgroundColorProp ?? "var(--gray-light-color)";

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

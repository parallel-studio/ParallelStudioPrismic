import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text-with-image.module.scss";

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

type TextWithImageProps = {
    children: ReactNode;
    as?: ElementType;
    variant?: TextWithImageVariants;
    heightVariant?: "default" | "fixed" | "auto";
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({
    children,
    as: Tag = "div",
    variant = "image_right",
    heightVariant = "default",
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[variant],
                styles[heightVariant]
            )}
        >
            {children}
        </Tag>
    );
};

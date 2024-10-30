import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text-with-image.module.scss";

export type TextWithImageVariants =
    | "image_left"
    | "image_right"
    | "image_left_compact"
    | "image_right_compact";

type TextWithImageProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    variant?: TextWithImageVariants;
    heightVariant?: "default" | "fixed" | "auto";
} & HTMLAttributes<T>;

export const TextWithImageComponent: FC<TextWithImageProps<ElementType>> = ({
    children,
    as: Tag = "div",
    variant = "image_right",
    heightVariant = "default",
    ...etc
}) => {
    const { className, } = etc;
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                styles[variant],
                styles[heightVariant],
                className
            )}
            ...rest 
        >
            {children}
        </Tag>
    );
};

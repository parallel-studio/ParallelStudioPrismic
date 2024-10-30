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
    classname?: string;
    variant?: TextWithImageVariants;
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant = "image_right",
}) => {
    return (
        <Tag className={clsx(styles.wrapper, styles[variant])}>{children}</Tag>
    );
};

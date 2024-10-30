import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text-with-image.module.scss";

type TextWithImageProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?:
        | "image_left"
        | "image_right"
        | "image_left_compact"
        | "image_right_compact";
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant = "image_left",
}) => {
    return (
        <Tag className={clsx(styles.wrapper, styles[variant])}>{children}</Tag>
    );
};

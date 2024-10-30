import { ElementType, FC, ReactNode } from "react";

import styles from "./text-with-image.module.scss";
import clsx from "clsx";

type TextWithImageProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?:
        | "image-left"
        | "image-right"
        | "image-left-compact"
        | "image-right-compact";
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant = "image-left",
}) => {
    return (
        <Tag className={clsx(styles.wrapper, styles[variant])}>{children}</Tag>
    );
};

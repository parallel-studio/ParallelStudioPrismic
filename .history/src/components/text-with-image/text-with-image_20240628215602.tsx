import { ElementType, FC, ReactNode } from "react";

import styles from "./text-with-image.module.scss";

type TextWithImageProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero";
};

export const TextWithImageComponent: FC<TextWithImageProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant,
}) => {
    return <Tag className={styles.wrapper}>{children}</Tag>;
};

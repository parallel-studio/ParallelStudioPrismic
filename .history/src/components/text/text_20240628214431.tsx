import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";

type TextProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "tight" | "loose";
};

export const TextComponent: FC<TextProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant = "tight",
}) => {
    return <Tag className={clsx(styles.wrapper, classname)}>{children}</Tag>;
};

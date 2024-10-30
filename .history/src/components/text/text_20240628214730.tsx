import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";

type TextProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero";
};

export const TextComponent: FC<TextProps> = ({
    children,
    as: Tag = "div",
    classname,
    variant,
}) => {
    return (
        <Tag className={clsx(styles.wrapper, styles[variant], classname)}>
            {children}
        </Tag>
    );
};

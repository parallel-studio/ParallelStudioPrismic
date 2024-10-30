import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";

type TextWrapper = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero";
};

export const TextWrapper: FC<TextWrapper> = ({
    children,
    as: Tag = "div",
    classname,
    variant,
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                variant ? styles[variant] : undefined,
                classname
            )}
        >
            {children}
        </Tag>
    );
};

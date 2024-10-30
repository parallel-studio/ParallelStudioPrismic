import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";

type TextWrapper<T extends ElementType> = {
    children: ReactNode;
    as?: T;
} & HTMLAttributes<T>;

export const TextWrapper: FC<TextWrapper<ElementType>> = ({
    children,
    as: Tag = "div",
    ...etc
}) => {
    const { className, ...rest } = etc;
    return (
        <Tag className={clsx(styles.wrapper, className)} {...rest}>
            {children}
        </Tag>
    );
};

import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text-container.module.scss";

type TextContainer<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    blockSize?: number;
} & HTMLAttributes<T>;

export const TextContainer: FC<TextContainer<ElementType>> = ({
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

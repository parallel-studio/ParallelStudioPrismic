"use client";

import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import styles from "./text.module.scss";

type TextWrapper<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    blockSize?: number;
} & HTMLAttributes<T>;

export const TextWrapper: FC<TextWrapper<ElementType>> = ({
    children,
    as: Tag = "div",
    blockSize,
    ...etc
}) => {
    const { className, ...rest } = etc;

    const { className: classNameStyled, styles: styleds } = css.resolve`
        ${Tag} {
            container-type: inline-size;
            min-block-size: ${blockSize}px;
        }
    `;
    return (
        <Tag
            className={clsx(styles.wrapper, classNameStyled, className)}
            {...rest}
        >
            {children}
            {blockSize && styleds}
        </Tag>
    );
};

"use client";

import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import { useLayout } from "@/context/layout";

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

    const { activeLayout } = useLayout();
    const isLayoutMobile = activeLayout === "mobile";

    const { className: classNameStyled, styles: styleds } = css.resolve`
        ${Tag} {
            min-block-size: ${isLayoutMobile ? "none" : `${blockSize}px`};
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

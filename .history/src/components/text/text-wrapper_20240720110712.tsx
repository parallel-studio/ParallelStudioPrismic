"use client";

import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

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

    const { className: classNameStyled, styles: styleds } = css.resolve`
        @import "../../styles/_media.scss";
        .blurp {
            background-color: red;
            @media.small {
                .blurp {
                    background-color: blue;
                }
            }
        }
    `;
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                classNameStyled,
                className,
                "blurp"
            )}
            {...rest}
        >
            {children}
            {styleds}
        </Tag>
    );
};

"use client";

import { ElementType, FC, ReactNode } from "react";

import styles from "./spacer.module.scss";
import css from "styled-jsx/css";

type SpacerProps = {
    children: ReactNode;
    as?: ElementType;
    spacing?: string;
};

export const Spacer: FC<SpacerProps> = ({
    children,
    as: Tag = "div",
    spacing = "50svh",
}) => {
    const { className, styles: styleds } = css.resolve`
        ${Tag} {
            block-size: ${color};
        }
    `;
    return <Tag className={styles.wrapper}>{children}</Tag>;
};

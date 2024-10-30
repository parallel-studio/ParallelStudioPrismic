"use client";

import { ElementType, FC, ReactNode } from "react";

import styles from "./spacer.module.scss";
import css from "styled-jsx/css";

type SpacerProps = {
    children: ReactNode;
    as?: ElementType;
};

export const Spacer: FC<SpacerProps> = ({ children, as: Tag = "div" }) => {
    const { className, styles: styleds } = css.resolve`
        div {
            color: ${color};
        }
    `;
    return <Tag className={styles.wrapper}>{children}</Tag>;
};

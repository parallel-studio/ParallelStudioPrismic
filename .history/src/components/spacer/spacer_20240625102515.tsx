"use client";

import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import styles from "./spacer.module.scss";

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
    // const { className, styles: styleds } = css.resolve`
    //     ${Tag} {
    //         block-size: calc(${spacing} - 45px);
    //     }
    // `;
    return (
        <Tag
            className={clsx(styles.wrapper)}
            style={{ blockSize: `calc(${spacing} - 45px)` }}
        >
            {children}
            {/* {styleds} */}
        </Tag>
    );
};

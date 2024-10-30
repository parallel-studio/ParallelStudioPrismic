"use client";

import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

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
    return (
        <Tag
            className={clsx(styles.wrapper)}
            style={{ blockSize: `calc(${spacing} - 45px)` }}
        >
            {children}
        </Tag>
    );
};

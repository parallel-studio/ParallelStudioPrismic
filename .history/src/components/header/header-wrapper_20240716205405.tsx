"use client";
import { FC, ReactNode, useRef } from "react";

import styles from "./header.module.scss";

type HeaderProps = {
    children: ReactNode;
};

export const HeaderWrapper: FC<HeaderProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <heade ref={ref} className={styles.header}>
            {children}
        </heade>
    );
};

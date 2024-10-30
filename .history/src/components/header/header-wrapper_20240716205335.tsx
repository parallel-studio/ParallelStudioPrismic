"use client";
import { FC, ReactNode } from "react";

import styles from "./header.module.scss";

type HeaderProps = {
    children: ReactNode;
};

export const HeaderWrapper: FC<HeaderProps> = ({ children }) => {
    return <header className={styles.header}>{children}</header>;
};

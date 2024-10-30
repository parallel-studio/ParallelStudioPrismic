"use client"

import { FC, ReactNode } from "react";

import { usePageTransition } from "../transitions";
import styles from "./main.module.scss";
type MainProps = {
    children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => {
    const { pending } = usePageTransition();
    return <main className={styles.main}>{children}</main>;
};

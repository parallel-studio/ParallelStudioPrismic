"use client";

import { FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import { motion, MotionProps } from "framer-motion";

import styles from "./main.module.scss";

type MainProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
    MotionProps;

export const Main: FC<MainProps> = ({ children, ...etc }) => {
    const { className, ...rest } = etc;

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(styles.main, className)}
            {...rest}
        >
            {children}
        </motion.main>
    );
};

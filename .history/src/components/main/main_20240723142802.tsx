"use client";

import { FC, ReactNode } from "react";

import { motion } from "framer-motion";

import styles from "./main.module.scss";

type MainProps = {
    children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.main}
            id="smooth-wrapper"
        >
            {children}
        </motion.main>
    );
};

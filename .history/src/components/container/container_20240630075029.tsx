"use client";

import { FC, ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { usePageTransition } from "../../lib/transitions";
import styles from "./animation-container.module.scss";

type AnimationContainerProps = {
    children: ReactNode;
};

export const AnimationContainer: FC<AnimationContainerProps> = ({
    children,
}) => {
    const { pending } = usePageTransition();
    return (
        <AnimatePresence>
            {!pending && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.main}
                >
                    {children}
                </motion.main>
            )}
        </AnimatePresence>
    );
};

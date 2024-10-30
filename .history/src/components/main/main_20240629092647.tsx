"use client";

import { FC, ReactNode, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { usePageTransition } from "../../lib/transitions";
import styles from "./main.module.scss";
import { useMekuri } from "@funtech-inc/mekuri";
type MainProps = {
    children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => {
    const { pending } = usePageTransition();
    const ref = useRef<HTMLDivElement>(null);
    useMekuri({
        onLeave: (props: MekuriCallbackProps) => {
            gsap.to(ref.current, {
                opacity: 0,
            });
        },
        onEnter: (props: MekuriCallbackProps) => {
            gsap.to(ref.current, {
                opacity: 1,
            });
        },
    });
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

"use client";
import { FC, ReactNode } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import styles from "./mega-hero.module.scss";

type MegaHeroCarouselProps = {
    children: ReactNode;
};

export const MegaHeroCarouselWrapper: FC<MegaHeroCarouselProps> = ({
    children,
}) => {
    return (
        <motion.div
            className={clsx(styles.carousel)}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {children}
        </motion.div>
    );
};

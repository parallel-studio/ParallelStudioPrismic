"use client";

import { FC, ReactNode } from "react";

import clsx from "clsx";

import { Section } from "@/components/section/section";

import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";

type MegaHeroWrapperProps = {
    children: ReactNode;
};
export const MegaHeroWrapper: FC<MegaHeroWrapperProps> = ({ children }) => {
    const { showMobileVersion } = useMegaHeroApi();
    return (
        <Section
            className={clsx(
                styles.mega,
                showMobileVersion ? styles.mobile_version : undefined
            )}
        >
            {children}
        </Section>
    );
};

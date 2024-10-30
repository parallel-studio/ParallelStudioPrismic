"use client";

import { FC } from "react";

import css from "styled-jsx/css";

import { useTheme } from "@/context/theme";

import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-info.module.scss";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { className, styles: styleds } = css.resolve`
        div {
            color: ${theme?.color};
        }
    `;
    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.tag}>Client</div>
                <div className={styles.client}>blasdasd</div>
            </div>
            <div>
                <div className={styles.tag}>Expertise</div>
                <div>vaslkdjas</div>
            </div>
        </div>
    );
};

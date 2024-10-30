"use client";

import { FC } from "react";

import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-info.module.scss";
import { useTheme } from "@/context/theme";
import css from "styled-jsx/css";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { className, styles: styleds } = css.resolve`
        h2 {
            span {
                color: ${theme?.color};
            }
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

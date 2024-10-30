"use client";

import { FC } from "react";

import clsx from "clsx";
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
        <div className={clsx(styles.wrapper)}>
            <div>
                <div className={clsx(styles.tag, className)}>
                    Client{styleds}
                </div>
                <div className={styles.client}>blasdasd</div>
            </div>
            <div>
                <div className={clsx(styles.tag, className)}>
                    Expertise {styleds}
                </div>
                <div>vaslkdjas</div>
            </div>
        </div>
    );
};

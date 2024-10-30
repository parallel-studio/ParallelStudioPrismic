"use client";

import { FC } from "react";

import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-info.module.scss";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();

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

"use client";

import { FC } from "react";

import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-info.module.scss";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    return <div className={styles.wrapper}>balbalba</div>;
};
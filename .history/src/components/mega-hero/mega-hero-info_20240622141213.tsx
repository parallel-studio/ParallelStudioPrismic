"use client";

import { FC } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import { useTheme } from "@/context/theme";

import { useMegaHeroApi } from "./context-hero";
import styles from "./mega-hero-info.module.scss";
import { useProject } from "./useProject";

type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();
    const { project } = useProject({ item });

    const { className, styles: styleds } = css.resolve`
        div {
            color: ${theme?.color};
        }
    `;
    console.log(project);

    return (
        <div className={clsx(styles.wrapper)}>
            <div>
                <div className={clsx(styles.tag, className)}>
                    Client
                    {styleds}
                </div>
                {/* {project && (
                    <div className={styles.client}>{project?.client}</div>
                )} */}
            </div>
            <div>
                <div className={clsx(styles.tag, className)}>
                    Expertise
                    {styleds}
                </div>
                <div>vaslkdjas</div>
            </div>
        </div>
    );
};

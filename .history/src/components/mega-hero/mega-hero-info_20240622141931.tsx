"use client";

import { FC } from "react";

import { isFilled } from "@prismicio/client";
import clsx from "clsx";
import css from "styled-jsx/css";

import { useTheme } from "@/context/theme";
import { hasClientData } from "@/lib/helpers";

import { useMegaHeroApi } from "./context-hero";
import { useProject } from "./helper-hooks";
import styles from "./mega-hero-info.module.scss";

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

    const client =
        isFilled.contentRelationship(project?.client) &&
        hasClientData(project?.client)
            ? project?.client.data
            : null;

    return (
        <div className={clsx(styles.wrapper)}>
            <div>
                <div className={clsx(styles.tag, className)}>
                    Client
                    {styleds}
                </div>
                {client && <div className={styles.client}>{client.name}</div>}
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

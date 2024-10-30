const ProjetHeroInformation = () => {};
("use client");

import { FC, useMemo } from "react";

import { isFilled } from "@prismicio/client";
import clsx from "clsx";

import { useTheme } from "@/context/theme";
import { hasCategoryData, hasClientData } from "@/lib/helpers";

import { useMegaHeroApi } from "./context-hero";
import { useProject } from "./helper-hooks";
import styles from "./mega-hero-info.module.scss";

type ProjectInfoProps = {};

export const ProjectInfo: FC<ProjectInfoProps> = ({}) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();
    const { project } = useProject({ item });

    const client =
        isFilled.contentRelationship(project?.client) &&
        hasClientData(project?.client)
            ? project?.client.data
            : null;

    const categories = useMemo(() => {
        const array = project?.categories.map((item) => {
            const category = hasCategoryData(item.category)
                ? item.category.data
                : null;
            if (category) return category.title;
        });
        return array?.sort()?.join(", ");
    }, [project]);

    if (item && client)
        return (
            <div className={clsx(styles.wrapper)}>
                <div>
                    <div
                        className={clsx(styles.tag)}
                        style={{ color: theme.color }}
                    >
                        Client
                    </div>
                    {client && (
                        <div className={styles.client}>{client.name}</div>
                    )}
                </div>
                <div>
                    <div
                        className={clsx(styles.tag)}
                        style={{ color: theme.color }}
                    >
                        Expertise
                    </div>
                    <div>{categories}</div>
                </div>
            </div>
        );
};

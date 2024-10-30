"use client";

import { FC, useMemo } from "react";

import { isFilled } from "@prismicio/client";

import { useTheme } from "@/context/theme";
import { hasCategoryData, hasClientData } from "@/lib/helpers";

import { Info } from "../info/info";
import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { useProject } from "./useProject";
type MegaHeroInfoProps = {};

export const MegaHeroInfo: FC<MegaHeroInfoProps> = ({}) => {
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

    if (client && isFilled.keyText(client.name))
        return (
            <Info
                client={client.name}
                expertises={categories}
                color={theme.color}
                className={styles.info}
            />
        );
};

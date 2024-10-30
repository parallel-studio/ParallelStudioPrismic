"use client";
import { FC } from "react";

import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useTheme } from "@/context/theme";

import { useMegaHeroApi } from "./context-hero";
import { useProject } from "./helper-hooks";

type MegaHeroHeaderProps = {
    slogan: RichTextField;
};

export const MegaHeroHeader: FC<MegaHeroHeaderProps> = ({ slogan }) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { project } = useProject({ item });

    return (
        <>
            {project && (
                <h2>
                    <span style={{ color: theme.color }}>{project?.title}</span>
                    {` ${project?.description}`}
                </h2>
            )}
            {!project && <PrismicRichText field={slogan} />}
        </>
    );
};

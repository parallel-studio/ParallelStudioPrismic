"use client";
import { ElementType, FC } from "react";

import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useTheme } from "@/context/theme";

import { Title } from "../title/title";
import { useMegaHeroApi } from "./context-hero";
import { useProject } from "./helper-hooks";

type MegaHeroHeaderProps = {
    as?: ElementType;
    slogan: RichTextField;
};

export const MegaHeroHeader: FC<MegaHeroHeaderProps> = ({
    as: Tag = "h2",
    slogan,
}) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { project } = useProject({ item });

    return (
        <>
            {project && (
                <Title
                    title={project.title}
                    description={project.description}
                    color={theme.color}
                />
            )}
            {!project && <PrismicRichText field={slogan} />}
        </>
    );
};

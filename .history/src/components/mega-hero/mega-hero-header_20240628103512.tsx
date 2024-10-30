"use client";
import { ElementType, FC } from "react";

import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useTheme } from "@/context/theme";

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
                <Tag>
                    <span style={{ color: theme.color }}>{project?.title}</span>
                    {` ${project?.description}`}
                </Tag>
            )}
            {!project && <PrismicRichText field={slogan} />}
        </>
    );
};

"use client";
import { ElementType, FC } from "react";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useTheme } from "@/context/theme";

import { Title } from "../title/title";
import { useMegaHeroApi } from "./context";
import { useProject } from "./useProject";

type MegaHeroHeaderProps = {
    as?: ElementType;
    slogan: RichTextField;
};

export const MegaHeroHeader: FC<MegaHeroHeaderProps> = ({ slogan }) => {
    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { project } = useProject({ item });

    return (
        <>
            {project && (
                <Title
                    title={
                        isFilled.keyText(project.title)
                            ? project.title
                            : undefined
                    }
                    description={
                        isFilled.keyText(project.description)
                            ? project.description
                            : undefined
                    }
                    color={theme.color}
                />
            )}
            {!project && <PrismicRichText field={slogan} />}
        </>
    );
};

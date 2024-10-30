"use client";
import { ElementType, FC, useEffect, useId, useRef } from "react";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { animate, easeOut } from "framer-motion";

import { Title } from "@/components/title/title";
import { useTheme } from "@/context/theme";

import { useMegaHeroApi } from "./context";
import styles from "./mega-hero.module.scss";
import { MegaHeroInfo } from "./mega-hero-info";
import { useProject } from "./useProject";

type MegaHeroHeaderProps = {
    as?: ElementType;
    slogan: RichTextField;
};

export const MegaHeroHeader: FC<MegaHeroHeaderProps> = ({ slogan }) => {
    const id = useId();
    const ref = useRef(null);

    const { item, showMobileVersion } = useMegaHeroApi();

    useEffect(() => {
        if (item && !showMobileVersion) {
            const animation = {
                opacity: [0, 1],
            };

            animate(ref.current, animation, {
                duration: 0.3,
                delay: 0.1,
                ease: easeOut,
            });
        }
    }, [item, showMobileVersion]);

    const { theme } = useTheme();

    const { project } = useProject({ item });

    const title = isFilled.keyText(project?.title) ? project.title : undefined;
    const description = isFilled.keyText(project?.description)
        ? project.description
        : undefined;
    const bypassSlogan = item?.bypass_video_slogan;

    return (
        <div ref={ref} className={styles.header} key={id}>
            {title && description && (
                <Title
                    title={title}
                    description={description}
                    color={theme.color}
                    showDescription={!showMobileVersion}
                />
            )}
            {!project && bypassSlogan && (
                <PrismicRichText field={bypassSlogan} />
            )}
            {!project && !bypassSlogan && slogan && (
                <PrismicRichText field={slogan} />
            )}
            <MegaHeroInfo />
        </div>
    );
};

"use client";
import { ElementType, FC, useEffect, useId, useRef } from "react";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { animate, delay, easeIn, motion } from "framer-motion";

import { useLayout } from "@/context/layout";
import { useTheme } from "@/context/theme";

import { Title } from "../title/title";
import { useMegaHeroApi } from "./context";
import { useProject } from "./useProject";
import { MegaHeroInfo } from "./mega-hero-info";
import styles from "./mega-hero.module.scss";
type MegaHeroHeaderProps = {
    as?: ElementType;
    slogan: RichTextField;
};

export const MegaHeroHeader: FC<MegaHeroHeaderProps> = ({ slogan }) => {
    const id = useId();
    const ref = useRef(null);
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const { item } = useMegaHeroApi();

    useEffect(() => {
        // Add animation logic here
        // Example animation: fade in
        if (item) {
            const animation = {
                opacity: [0, 1],
            };

            animate(ref.current, animation, {
                duration: 0.3,
                delay: 0.1,
                ease: easeIn,
            });
        }
    }, [item, ref.current]);

    const { theme } = useTheme();

    const { project } = useProject({ item });

    return (
        <div ref={ref} className={styles.header} key={id}>
            {project && !isMobileLayoutActive && (
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
            <MegaHeroInfo />
        </div>
    );
};

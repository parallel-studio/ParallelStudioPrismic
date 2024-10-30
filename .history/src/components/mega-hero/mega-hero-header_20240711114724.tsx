"use client";
import { ElementType, FC, useId } from "react";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

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
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const { item } = useMegaHeroApi();
    const { theme } = useTheme();

    const { project } = useProject({ item });

    return (
        <motion.div
            className={styles.header}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 3, ease: "ease" },
            }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
            key={id}
        >
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
        </motion.div>
    );
};
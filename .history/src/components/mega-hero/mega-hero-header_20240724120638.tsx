"use client";
import { ElementType, FC, useEffect, useId, useRef } from "react";

import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { animate, AnimatePresence, easeOut } from "framer-motion";
import { motion } from "framer-motion";

import { useLayout } from "@/context/layout";
import { useTheme } from "@/context/theme";

import { Title } from "../title/title";
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
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const { item } = useMegaHeroApi();

    useEffect(() => {
        if (item) {
            const animation = {
                opacity: [0, 1],
            };

            animate(ref.current, animation, {
                duration: 0.3,
                delay: 0.1,
                ease: easeOut,
            });
        }
    }, [item]);

    const { theme } = useTheme();

    const { project } = useProject({ item });

    const title = isFilled.keyText(project?.title) ? project.title : undefined;
    const description = isFilled.keyText(project?.description)
        ? project.description
        : undefined;
    const bypassSlogan = item?.bypass_video_slogan;

    return (
        <div
            ref={ref}
            className={styles.header}
            // initial={{
            //     opacity: 0,
            // }}
            // animate={{
            //     opacity: 1,
            //     transition: {
            //         duration: 1,
            //         delay: 0.1,
            //         ease: easeOut,
            //     },
            // }}
            // exit={{
            //     opacity: 0,
            //     transition: {
            //         duration: 1,
            //         ease: easeOut,
            //     },
            // }}
            key={id}
        >
            {title && description && (
                <Title
                    title={title}
                    description={description}
                    color={theme.color}
                    showDescription={!isMobileLayoutActive}
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

"use client";

import { FC, useEffect, useRef, useState } from "react";

import { isFilled, LinkField } from "@prismicio/client";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

import { useLayout } from "@/context/layout";

import {
    FooterDocument,
    SettingsDocument,
    SettingsDocumentData,
} from "../../../prismicio-types";
import { LinkArrow } from "../link/link";
import { SocialLinks } from "../social-links/social-links";
import styles from "./footer.module.scss";

type Link = {
    link: LinkField;
    label: string;
};

type FooterProps = {
    links: SettingsDocumentData;
    pageId: string;
};

export const Footer: FC<FooterProps> = ({ footer, pageId }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { social_links, legal_mentions } = footer;

    const { scrollYProgress } = useScroll({
        offset: ["start end", "end end"],
    });

    const { scrollYProgress: scrollYParallax } = useScroll({
        offset: ["start end", "end end"],
    });
    const [offsetValue, setOffsetValue] = useState(0.7);
    const [footerColor, setFooterColor] = useState<string>("white");

    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const showBackLink = !footer.data.disable.some(
        (item) => (item.page as any).id === pageId
    );

    useEffect(() => {
        if (isMobileLayoutActive) {
            setOffsetValue(0.3);
        } else {
            setOffsetValue(0.7);
        }
    }, [isMobileLayoutActive]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > offsetValue) {
            setFooterColor("black");
        }
    });

    const y = useTransform(
        useSpring(scrollYParallax, { duration: 1000, bounce: 0 }),
        [0, 1],
        [150, 0]
    );

    return (
        <motion.footer
            ref={ref}
            className={styles.wrapper}
            style={{
                backgroundColor: footerColor,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                backgroundColor: "white",
            }}
        >
            <motion.div
                className={styles.container}
                style={{
                    y: isMobileLayoutActive ? 0 : y,
                }}
            >
                {showBackLink && (
                    <LinkArrow link={back_to_link_project} variant="back_to">
                        {back_to_link_project_name}
                    </LinkArrow>
                )}
                {links && links.length > 0 && <SocialLinks links={links} />}
            </motion.div>
            <p className={styles.legal}>{legal_mentions}</p>
        </motion.footer>
    );
};

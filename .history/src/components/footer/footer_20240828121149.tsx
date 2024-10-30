"use client";

import { FC, useEffect, useRef, useState } from "react";

import { isFilled, KeyTextField, LinkField } from "@prismicio/client";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

import { useLayout } from "@/context/layout";

import { SettingsDocumentData } from "../../../prismicio-types";
import { LinkArrow } from "../link/link";
import { SocialLinks } from "../social-links/social-links";
import styles from "./footer.module.scss";

type Link = {
    link: LinkField;
    label: string | KeyTextField;
};

type FooterProps = {
    pageId: string;
    showBackToLink?: boolean;
    bacToLink?: Link;
} & SettingsDocumentData;

export const Footer: FC<FooterProps> = ({
    pageId,
    social_links,
    legal_mentions,
    footer_back_to_link,
    bacToLink,
    showBackToLink = true,
}) => {
    const ref = useRef<HTMLDivElement>(null);

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

    const arrowLink = bacToLink ?? footer_back_to_link[0];

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
                {bacToLink && (
                    <LinkArrow link={bacToLink.link} variant="back_to">
                        {bacToLink.label}
                    </LinkArrow>
                )}
                {isFilled.group(social_links) && (
                    <SocialLinks links={social_links} />
                )}
            </motion.div>
            <p className={styles.legal}>{legal_mentions}</p>
        </motion.footer>
    );
};

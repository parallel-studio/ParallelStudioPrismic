"use client";

import { FC, useEffect, useRef, useState } from "react";

import { isFilled } from "@prismicio/client";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

import { useLayout } from "@/context/layout";

import { FooterDocument } from "../../../prismicio-types";
import { LinkArrow } from "../link/link";
import { SocialLinks } from "../social-links/social-links";
import styles from "./footer.module.scss";

type FooterProps = {
    footer: FooterDocument;
    pageId: string;
};

export const Footer: FC<FooterProps> = ({ footer, pageId }) => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        links,
        back_to_link_project,
        back_to_link_project_name,
        legal_mentions,
    } = footer.data;

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
                <LinkArrow link={back_to_link_project} variant="back_to">
                    {back_to_link_project_name}
                </LinkArrow>
                {isFilled.group(links) && <SocialLinks links={links} />}
            </motion.div>
            <p className={styles.legal}>{legal_mentions}</p>
        </motion.footer>
    );
};

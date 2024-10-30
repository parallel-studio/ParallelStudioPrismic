"use client";

import { FC, useEffect, useRef, useState } from "react";

import { PrismicNextLink } from "@prismicio/next";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { useLayout } from "@/lib/mobile-layout";

import { FooterDocument } from "../../../prismicio-types";
import { ArrowLeft } from "../icons/arrow-left";
import { SocialLinks } from "../social-links/social-links";
import styles from "./footer.module.scss";

type LinkProps = {
    footer: FooterDocument;
};

export const Link: FC<LinkProps> = ({ footer }) => {
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
    const [offsetValue, setOffsetValue] = useState(0.7);
    const [footerColor, setFooterColor] = useState<string>("white");

    const { isMobileLayoutActive } = useLayout();

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

    return (
        <PrismicNextLink
            className={styles.back_to}
            field={back_to_link_project}
        >
            <ArrowLeft />
            {back_to_link_project_name}
        </PrismicNextLink>
    );
};

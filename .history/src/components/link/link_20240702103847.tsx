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

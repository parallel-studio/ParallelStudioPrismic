import { FC, ReactNode } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import { ArrowLeft } from "../icons/arrow-left";
import styles from "./link.module.scss";

type LinkProps = {
    link: LinkField;
    children: ReactNode;
    variant: "back_to" | "go_to";
};

export const Link: FC<LinkProps> = ({ children, link, variant = "go_to" }) => {
    return (
        <PrismicNextLink className={styles.back_to} field={link}>
            {variant === "back_to" && <ArrowLeft />}
            {children}
            {variant === "go_to" && <ArrowLeft />}
        </PrismicNextLink>
    );
};

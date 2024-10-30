import { FC, ReactNode } from "react";

import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import { FooterDocument } from "../../../prismicio-types";
import { ArrowLeft } from "../icons/arrow-left";
import styles from "./footer.module.scss";

type LinkProps = {
    link: LinkField;
    children: ReactNode;
};

export const Link: FC<LinkProps> = ({ children, link }) => {
    return (
        <PrismicNextLink className={styles.back_to} field={link}>
            <ArrowLeft />
            {children}
        </PrismicNextLink>
    );
};

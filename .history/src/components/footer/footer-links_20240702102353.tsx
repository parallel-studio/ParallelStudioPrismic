import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import {
    FooterDocument,
    FooterDocumentDataLinksItem,
} from "../../../prismicio-types";
import styles from "./footer.module.scss";

type FooterLinksProps = {
    links: FooterDocumentDataLinksItem[];
};

export const FooterLinks: FC<FooterLinksProps> = ({ links }) => {
    return (
        <div>
            <div className={styles.links_title}>CONNECT</div>
            <ul className={styles.links}>
                {links.map((link, index) => {
                    if (
                        isFilled.link(link.link) &&
                        isFilled.keyText(link.title)
                    )
                        return (
                            <li key={index}>
                                <PrismicNextLink field={link.link}>
                                    {link.title}
                                </PrismicNextLink>
                            </li>
                        );
                })}
            </ul>
        </div>
    );
};

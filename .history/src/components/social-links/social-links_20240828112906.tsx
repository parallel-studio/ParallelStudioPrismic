import { FC, HTMLAttributes } from "react";

import { isFilled } from "@prismicio/client";
import clsx from "clsx";

import {
    FooterDocumentDataLinksItem,
    SettingsDocumentDataSocialLinksItem,
} from "../../../prismicio-types";
import { Eyebrow } from "../eyebrow/eyebrow";
import { LinkComponent } from "../link/link-component";
import styles from "./social-links.module.scss";

type SocialLinksProps = {
    links: SettingsDocumentDataSocialLinksItem[];
    theme?: "light" | "dark";
} & HTMLAttributes<HTMLDivElement>;

export const SocialLinks: FC<SocialLinksProps> = ({
    links,
    theme = "dark",
    ...props
}) => {
    const { className, ...etc } = props;
    return (
        <div className={clsx(styles[theme], className)} {...etc}>
            <Eyebrow theme={theme}>Connect</Eyebrow>
            <ul className={styles.links}>
                {links.map((link, index) => {
                    if (
                        isFilled.link(link.link) &&
                        isFilled.keyText(link.title)
                    )
                        return (
                            <li key={index}>
                                <LinkComponent field={link.link}>
                                    {link.title}
                                </LinkComponent>
                            </li>
                        );
                })}
            </ul>
        </div>
    );
};

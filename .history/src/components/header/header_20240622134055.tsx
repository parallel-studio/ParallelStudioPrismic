"use client";
import { asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";

import { useTheme } from "@/context/theme";
import { createClient } from "@/prismicio";

import styles from "./header.module.scss";
import { HeaderLogo } from "./header-logo";

export async function Header() {
    const client = createClient({});
    const navigation = await client.getSingle("navigation");
    const { theme } = useTheme();

    return (
        <header className={styles.header}>
            <HeaderLogo ref={theme} />
            <ul className={styles.nav}>
                {navigation.data.links.map((link) => {
                    return (
                        <li key={asText(link.label)}>
                            <PrismicNextLink field={link.link}>
                                <PrismicText field={link.label} />
                            </PrismicNextLink>
                        </li>
                    );
                })}
            </ul>
        </header>
    );
}

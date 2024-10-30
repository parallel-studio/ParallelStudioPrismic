import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { createClient } from "@/prismicio";

import { LinkComponent } from "../link/link-component";
import styles from "./header.module.scss";
import { HeaderLogo } from "./header-logo";

type HeaderProps = {
    params: Params;
};

export async function Header({ params }: HeaderProps) {
    const client = createClient({});
    const navigation = await client.getSingle("navigation", {
        lang: params.lang,
    });

    return (
        <header className={styles.header}>
            <LinkComponent
                className={styles.logo}
                field={navigation.data.homepage}
                aria-label="Homepage"
                prefetch
            >
                <HeaderLogo />
            </LinkComponent>
            <ul className={styles.nav}>
                {navigation.data.links.map((link) => {
                    return (
                        <li key={asText(link.label)}>
                            <LinkComponent
                                className="link_underline"
                                field={link.link}
                                prefetch
                            >
                                <PrismicText field={link.label} />
                            </LinkComponent>
                        </li>
                    );
                })}
            </ul>
        </header>
    );
}

import { asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { createClient } from "@/prismicio";

import styles from "./header.module.scss";
import { HeaderLogo } from "./header-logo";
import { LinkComponent } from "./link-component";

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
            <PrismicNextLink
                field={navigation.data.homepage}
                aria-label="Homepage"
                prefetch
            >
                <HeaderLogo />
            </PrismicNextLink>
            <ul className={styles.nav}>
                {navigation.data.links.map((link) => {
                    return (
                        <li key={asText(link.label)}>
                            <PrismicNextLink
                                className="link_underline"
                                field={link.link}
                                prefetch
                            >
                                <PrismicText field={link.label} />
                            </PrismicNextLink>
                            <LinkComponent
                                className="link_underline"
                                props={{prefetch: true}}
                                field={link.link}
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

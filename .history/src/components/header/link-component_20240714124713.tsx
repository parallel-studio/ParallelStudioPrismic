import { asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { createClient } from "@/prismicio";

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
        <PrismicNextLink className="link_underline" field={link.link} prefetch>
            <PrismicText field={link.label} />
        </PrismicNextLink>
    );
}

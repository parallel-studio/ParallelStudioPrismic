import { FC } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { createClient } from "@/prismicio";

import { FooterClient } from "./footer-client";

type FooterProps = {
    params: Params;
};

export const Footer: FC<FooterProps> = async ({ params }) => {
    const client = createClient({});
    const footer = await client.getSingle("footer", { lang: params.lang });

    console.log(footer);
    if (footer) return <FooterClient footer={footer} />;
};

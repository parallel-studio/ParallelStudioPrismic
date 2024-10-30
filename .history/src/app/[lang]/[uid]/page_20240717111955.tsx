import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { FooterDocument } from "../../../../prismicio-types";

type GenerateMetadataParams = {
    params: Params;
};

type PageParams = {
    params: Params;
};

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const client = createClient({});
    const page = await client
        .getByUID("page", params.uid, { lang: params.lang })
        .catch(() => notFound());
    const settings = await client.getSingle("settings", { lang: params.lang });

    return {
        title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title,
            images: [
                {
                    url: page.data.meta_image.url,
                },
            ],
        },
    };
}

export type PageContext = {
    footer: FooterDocument;
};

export default async function Page({ params }: PageParams) {
    const client = createClient({});
    const page = await client
        .getByUID("page", params.uid, { lang: params.lang })
        .catch(() => notFound());

    const footer = await client.getSingle("footer", { lang: params.lang });

    return (
        <Main>
            <ThemeComponent theme={defaultColor} />
            <SliceZone
                slices={page.data.slices}
                components={components}
                context={{ footer: footer, params }}
            />
        </Main>
    );
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const pages = await client.getAllByType("page", { lang: params.lang });

    return pages.map((page) => {
        return { uid: page.uid, lang: params.lang };
    });
}

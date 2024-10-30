import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { Main } from "@/components/main/main";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type GenerateMetadataParams = {
    params: Params;
};

type PageParams = {
    params: Params;
};

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const client = createClient({});
    const page = await client
        .getByUID("client", params.client, { lang: params.lang })
        .catch(() => notFound());
    const settings = await client.getSingle("settings");

    if (page.data.activate_page)
        return {
            title: `${page.data.meta_title} | ${asText(settings.data.siteTitle)}`,
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

export default async function Page({ params }: PageParams) {
    const client = createClient({});
    const page = await client
        .getByUID("client", params.client, { lang: params.lang })
        .catch(() => notFound());

    if (!page.data.activate_page) return notFound();
    return (
        <Main>
            <SliceZone
                slices={page.data.slices}
                components={components}
                context={params}
            />
        </Main>
    );
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const pages = await client.getAllByType("client", {
        lang: params.lang,
    });

    return pages
        .filter((page) => page.data.activate_page === true)
        .map((page) => {
            return { client: page.uid };
        });
}

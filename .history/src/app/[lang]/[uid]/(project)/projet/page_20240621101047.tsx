import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type GenerateMetadataParams = {
    params: Params;
};

type PageParams = {
    params: Params;
};

const LANG = "fr-fr";

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const client = createClient({});
    const page = await client
        .getByUID("page", params.uid, { lang: LANG })
        .catch(() => notFound());
    const settings = await client.getSingle("settings");

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

export default async function Page({ params }: PageParams) {
    const client = createClient({});
    const page = await client
        .getByUID("project", params.uid, { lang: LANG })
        .catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const pages = await client.getAllByType("project", { lang: LANG });

    return pages.map((page) => {
        return { uid: page.uid };
    });
}

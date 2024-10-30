import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { InferGetStaticPropsType } from "next";

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
    console.log(params);
    const client = createClient({});
    const page = await client
        .getByUID("page", params.uid, { lang: params.lang })
        .catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const pages = await client.getAllByType("page", { lang: params.lang });

    return pages.map((page) => {
        return { uid: page.uid };
    });
}

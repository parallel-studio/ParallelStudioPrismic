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
    searchParams: URLSearchParams;
};

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const client = createClient({});
    const page = await client
        .getByUID("page", "work", params.lang)
        .catch(() => notFound());
    const settings = await client.getSingle("settings");

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

export default async function Page({ params, searchParams }: PageParams) {
    const client = createClient({});
    console.log(searchParams);

    // const page = await client
    //     .getByUID("page", "work", params.lang)
    //     .catch(() => notFound());

    // return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const page = await client.getByUID("page", "work", params.lang);

    return { uid: page.uid };
}

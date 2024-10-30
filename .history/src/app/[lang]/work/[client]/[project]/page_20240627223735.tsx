import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { ProjectHeroLinks } from "@/components/project-hero/request";
import { ProjectPage } from "@/components/types/project";
import { hasClientData } from "@/lib/helpers";
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
        .getByUID("project", params.project)
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

export default async function Page({ params }: PageParams) {
    const client = createClient({});
    const page = await client
        .getByUID("project", params.project, {
            lang: params.lang,
            fetchLinks: [...ProjectHeroLinks],
        })
        .catch(() => notFound());

    return;
    <>
        <ProjectPage />
        <SliceZone slices={page.data.slices} components={components} />
    </>;
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const pages = await client.getAllByType("project", {
        lang: params.lang,
        fetchLinks: ["client.uid"],
    });

    return pages.map((page) => {
        if (hasClientData(page.data.client))
            return { project: page.uid, client: page.data.client.uid };
    });
}

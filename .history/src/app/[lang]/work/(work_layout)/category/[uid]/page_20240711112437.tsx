import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { ProjectGalleryLinks } from "@/slices/ProjectGallery/request";
import { hasCategoryData } from "@/lib/helpers";

type GenerateMetadataParams = {
    params: Params;
};

type PageParams = {
    params: Params;
};

export async function generateMetadata({ params }: GenerateMetadataParams) {
    const client = createClient({});
    const page = await client
        .getByUID("category", params.uid, { lang: params.lang })
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
        .getByUID("category", params.uid, {
            lang: params.lang,
            fetchLinks: [...ProjectGalleryLinks],
        })
        .catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams({ params }: PageParams) {
    const client = createClient({});

    const id = "filter";

    const filter = await client.getSingle(id, {
        lang: params.lang,
    });

    const categories = filter.data.categories;

    categories?.map((item) => {
        return { uid: item.category.uid };
    });
}

import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { MegaHeroLinks } from "@/slices/MegaHero/request";

type Params = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = params;
    const client = createClient({});

    const page = await client.getByUID("page", "home", { lang });

    return {
        title: page.data.meta_title ?? "",
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title ?? "",
            images: [
                {
                    url: page.data.meta_image.url ?? "",
                },
            ],
        },
    };
}

export default async function Page({ params: { lang } }: Params) {
    const client = createClient({});
    const page = await client
        .getByUID("page", "home", {
            lang,
            fetchLinks: [...MegaHeroLinks],
        })
        .catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

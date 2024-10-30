import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Metadata } from "next";

type Params = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang, locale } = params;
    console.log(locale);
    const client = createClient({});

    const page = await client.getByUID("page", "home");

    console.log(page);

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
    const page = await client.getByUID("page", "home").catch(() => notFound());

    console.log(page);

    return <SliceZone slices={page.data.slices} components={components} />;
}

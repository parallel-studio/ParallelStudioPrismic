import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Metadata } from "next";

type Params = {
    params: { lang: string };
};

export async function generateMetadata({
    params: { lang },
}: Params): Promise<Metadata> {
    console.log(params);

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
        .getByUID("page", "home", { lang })
        .catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

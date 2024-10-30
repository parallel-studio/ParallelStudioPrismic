import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = params;
    const client = createClient({});

    const page = await client.getSingle("not_found", { lang });

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

export default async function Page({ params }: Params) {
    const { lang } = params;
    const client = createClient({});
    const page = await client
        .getSingle("not_found", { lang })
        .catch(() => notFound());

    return (
        <Main>
            <ThemeComponent theme={defaultColor} />
            <SliceZone slices={page.data.slices} components={components} />
        </Main>
    );
}

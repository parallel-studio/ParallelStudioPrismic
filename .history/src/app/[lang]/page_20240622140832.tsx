import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Main } from "@/components/main/main";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { PageDocument, ProjectDocument } from "../../../prismicio-types";

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
            fetchLinks: [
                "project.title",
                "project.description",
                "project.color",
                "project.categories",
                "project.client",
                "client.title",
            ],
        })
        .catch(() => notFound());

    return (
        <Main>
            <SliceZone slices={page.data.slices} components={components} />
        </Main>
    );
}

import { asText, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";
import { ProjectCredits } from "@/components/project-credits/project-credits";
import { ProjectCreditsLinks } from "@/components/project-credits/request";
import { ProjectHero } from "@/components/project-hero/project-hero";
import { ProjectHeroLinks } from "@/components/project-hero/request";
import { ThemeComponent } from "@/components/theme";
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
    const client = createClient({
        fetchOptions: { next: { tags: [params.project] } },
    });
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
        robots: page.data.meta_robots,
    };
}

export default async function Page({ params }: PageParams) {
    const client = createClient({
        fetchOptions: { next: { tags: [params.project] } },
    });

    const page = await client
        .getByUID("project", params.project, {
            lang: params.lang,
            fetchLinks: [...ProjectHeroLinks, ...ProjectCreditsLinks],
        })
        .catch(() => notFound());

    const footer = await client.getSingle("footer", { lang: params.lang });

    console.log(footer);
    const showFooter = footer.data.disable.some(
        (item) => item.page === "project"
    );

    return (
        <>
            <Main>
                {isFilled.color(page.data.color) && (
                    <ThemeComponent theme={page.data.color} />
                )}
                <ProjectHero page={page} />
                <SliceZone
                    slices={page.data.slices}
                    components={components}
                    context={{ loadingColor: page.data.color, params }}
                />
                {isFilled.group(page.data.credits) && (
                    <ProjectCredits
                        credits={page.data.credits}
                        color={page.data.color}
                    />
                )}
            </Main>
            <Footer footer={footer} />
        </>
    );
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

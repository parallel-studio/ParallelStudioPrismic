import { isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
import { createClient, home } from "@/prismicio";
import { components } from "@/slices";
import { MegaHeroLinks } from "@/slices/MegaHero/request";

type Params = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = params;
    const client = createClient({ fetchOptions: { next: { tags: [home] } } });

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
        robots: page.data.meta_robots,
    };
}

export default async function Page({ params: { lang } }: Params) {
    const client = createClient({ fetchOptions: { next: { tags: [home] } } });

    const page = await client
        .getByUID("page", "home", {
            lang,
            fetchLinks: [...MegaHeroLinks],
        })
        .catch(() => notFound());

    const settings = await client.getSingle("settings", { lang });
    const settingsData = settings.data;
    const footerData = page.data.footer;

    return (
        <Main>
            <ThemeComponent theme={defaultColor} />
            <SliceZone slices={page.data.slices} components={components} />
            {isFilled.group(footerData) && (
                <Footer
                    {...settingsData}
                    pageId={page.id}
                    backToLink={{
                        link: footerData[0].link_back,
                        label: footerData[0].link_back_label,
                    }}
                />
            )}
        </Main>
    );
}

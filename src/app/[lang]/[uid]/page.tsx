import { asText, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { ProjectGalleryLinks } from "@/slices/ProjectGallery/request";

type GenerateMetadataParams = {
  params: Params;
};

type PageParams = {
  params: Params;
};

export async function generateStaticParams({ params }: PageParams) {
  const client = createClient({});

  const pages = await client.getAllByType("page", {
    lang: params.lang,
  });

  return pages.map((page) => {
    return { uid: page.uid, lang: params.lang };
  });
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const client = createClient({
    fetchOptions: { next: { tags: [params.uid] } },
  });

  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound());

  const settings = await client.getSingle("settings", { lang: params.lang });

  return {
    title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
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
    fetchOptions: { next: { tags: [params.uid] } },
  });

  const page = await client
    .getByUID("page", params.uid, {
      lang: params.lang,
      fetchLinks: [...ProjectGalleryLinks],
    })
    .catch(() => notFound());

  const settings = await client.getSingle("settings", { lang: params.lang });
  const settingsData = settings.data;
  const footerData = page.data.footer;

  return (
    <>
      <Main>
        <ThemeComponent theme={defaultColor} />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ params }}
        />
      </Main>
      {isFilled.group(footerData) && (
        <Footer
          {...settingsData}
          backToLink={{
            link: footerData[0].link_back,
            label: footerData[0].link_back_label,
          }}
          showBackToLink={footerData[0].show_back_to_link}
        />
      )}
    </>
  );
}

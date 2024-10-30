import { sortBy, uniq } from "lodash";

import { baseUrl } from "../../baseUrl";
import { ContentRecord } from "../classes";
import { documentsSlugs } from "../classes/documents/slugs";
import { MODELS } from "../classes/models";
import { fetchServerDataQuery } from "./fetchServerDataQuery";

export default async function getSitemap(locale: string) {
    const models = Object.values(MODELS);

    let xmlItems: string[] = [];

    await Promise.all(
        models.map(async (model) => {
            try {
                let length = 0;
                let skip = 0;
                let count = Infinity;
                let first = 100;

                const foundDocument =
                    documentsSlugs.find(
                        (item) => item.typename === model.typename
                    ) ?? documentsSlugs[0];

                while (length < count) {
                    const allSlugs = 

                    const { meta } = allSlugs;

                    count = meta.count ?? -Infinity;

                    if (allSlugs) {
                        let { pages } = allSlugs;
                        length = +pages.length;

                        if (pages?.length > 0) {
                            pages = pages.filter((page: any) => {
                                return (
                                    page.configuration.internalIndexing === true
                                );
                            });

                            for (const page of pages) {
                                if (page.slug && page.__typename) {
                                    const path = new ContentRecord(
                                        page.__typename as string,
                                        page.slug as string
                                    ).createPath(page, locale);
                                    if (path) {
                                        const xmlItem = `<url><loc>${baseUrl}${path}</loc><lastmod>${page._publishedAt}</lastmod></url>`;
                                        xmlItems.push(xmlItem);
                                    }
                                }
                            }
                        }
                    } else {
                        length = -1;
                    }

                    skip += first;
                }
            } catch (error) {}
        })
    );

    // console.log(xmlItems);

    xmlItems = sortBy(uniq(xmlItems));

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlItems.join("")}
    </urlset>
  `;
    return xmlResponse;
}

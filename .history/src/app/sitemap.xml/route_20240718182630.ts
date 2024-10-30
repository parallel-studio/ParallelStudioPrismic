import { sortBy, uniq } from "lodash";
import { NextResponse } from "next/server";

import { baseUrl } from "../../../baseUrl";
import { locales } from "../../../i18nconfig";

export async function GET() {
    let xmlItems = locales.map((locale) => {
        return `<sitemap><loc>${baseUrl}/${locale}/sitemap.xml</loc></sitemap>`;
    });

    xmlItems = sortBy(uniq(xmlItems));

    const xmlResponse = `
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems.join(
            ""
        )}</sitemapindex>
    `;

    return new NextResponse(xmlResponse, {
        status: 200,
        headers: {
            "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
            "content-type": "application/xml",
        },
    });
}

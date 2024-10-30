import { NextRequest, NextResponse } from "next/server";

import getSitemap from "@/lib/functions/getSitemap";

import { locales } from "../../../../i18nconfig";

export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);

    let locale = pathname.split("/")[1];

    locale = locales.filter((lang) => {
        return lang === locale;
    })[0];

    if (!locale) {
        return new NextResponse(`No matching locale found.`, {
            status: 501,
            headers: {
                "Cache-control":
                    "public, s-maxage=86400, stale-while-revalidate",
                "content-type": "application/xml",
            },
        });
    }

    const xmlResponse = await getSitemap(locale);

    return new NextResponse(xmlResponse, {
        status: 200,
        headers: {
            "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
            "content-type": "application/xml",
        },
    });
}

import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";

import i18nConfig from "../i18nconfig";

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const CSP = `
    default-src 'self' https://www.datocms-assets.com https://graphql.datocms.com;
    connect-src 'self' https://graphql-listen.datocms.com/ https://graphql.datocms.com/ https://vitals.vercel-insights.com/ google-analytics.com;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
	img-src 'self' https://www.uploads-ssl.webflow.com https://www.datocms-assets.com blob: data:;
    font-src 'self' googleapis.com data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
	frame-ancestors 'self' https://plugins-cdn.datocms.com http://plugins-cdn.datocms.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
    `;

    const HEADERS: { key: string; value: string }[] = [
        // {
        //     key: "x-nonce",
        //     value: nonce,
        // },
        // {
        //     key: "Content-Security-Policy",
        //     value: CSP.replace(/\s{2,}/g, " ").trim(),
        // },
        {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
        },
        {
            key: "Referrer-Policy",
            value: "same-origin",
        },
        {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload;",
        },
        {
            key: "X-Content-Type-Options",
            value: "nosniff",
        },
        {
            key: "X-DNS-Prefetch-Control",
            value: "on",
        },
        {
            key: "X-XSS-Protection",
            value: "1; mode=block",
        },
    ];

    const requestHeaders = request.headers;

    HEADERS.map((header) => {
        requestHeaders.set(header.key, header.value);
    });

    const responseWithHeaders = NextResponse.next({
        headers: requestHeaders,
        request: {
            headers: requestHeaders,
        },
    });

    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public
         * - robots.txt
         */
        {
            // source: "/((?!api|static|_next|favicon.ico|sitemap.xml|api/preview-links).*)",
            source: "/((?!static|_next|favicon.ico|icon|sitemap.xml|robots.txt|public).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};

// export async function middleware(request: NextRequest) {
//     const client = createClient({});
//     const repository = await client.getRepository();

//     const locales = repository.languages.map((lang) => lang.id);
//     const defaultLocale = locales[0];

//     // Check if there is any supported locale in the pathname
//     const { pathname } = request.nextUrl;

//     const pathnameIsMissingLocale = locales.every(
//         (locale) =>
//             !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//     );

//     // Redirect to default locale if there is no supported locale prefix
//     if (pathnameIsMissingLocale) {
//         return NextResponse.rewrite(
//             new URL(`/${defaultLocale}${pathname}`, request.url)
//         );
//     }
// }

// export const config = {
// 	// Don’t change the URL of Next.js assets starting with _next
//   matcher: ['/((?!_next).*)'],
// };

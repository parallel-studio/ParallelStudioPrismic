/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";
import * as prismic from "@prismicio/client";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

const createClient = () => {
    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
        routes,
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { tags: ["prismic"] }, cache: "force-cache" }
                : { next: { revalidate: 5 } },
    });

    prismicNext.enableAutoPreviews({ client });
    return client;
};

async function getRedirects() {
    const client = createClient();
    const data = await client.getSingle("redirects");
    const redirectsData = data.data.redirects;

    const redirects = [];

    if (redirectsData?.length > 0) {
        redirectsData.forEach((redirect) => {
            redirects.push({
                source: redirect.source,
                destination: redirect.destination,
                permanent: redirect.permanent,
            });
        });
    }

    console.log(redirects);

    return redirects;
}

console.log(await getRedirects());

const nextConfig = async () => {
    return {
        scrollRestoration: false,
        reactStrictMode: true,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "**.mux.com",
                    port: "",
                },
            ],
        },
        async redirects() {
            return getRedirects();
        },
    };
};

export default withPlaiceholder(nextConfig);

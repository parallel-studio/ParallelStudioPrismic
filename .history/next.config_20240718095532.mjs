/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";
import * as prismic from "@prismicio/client";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

const createClient = (config) => {
    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { tags: ["prismic"] }, cache: "force-cache" }
                : { next: { revalidate: 5 } },
        ...config,
    });

    return client;
};

async function getRedirects() {
    const client = createClient();
    const data = await client.getSingle("redirects");
    const redirectsData = data.data.redirects;

    const redirects = [];

    console.log(redirectsData);

    if (redirectsData?.length > 0) {
        redirectsData.forEach((redirect) => {
            redirects.push({
                source: redirect.source,
                destination: redirect.destination,
                permanent: redirect.permanent,
            });
        });
    }

    return redirectsData;
}

const redirects = await getRedirects();

const nextConfig = {
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
    redirects,
    // redirects: [{ source: "/test", destination: "/hello", permanent: true }],
};

export default withPlaiceholder(nextConfig);

/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";
import * as prismic from "@prismicio/client";

export const createClient = (config) => {
    console.log("ENV", process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN);
    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
        routes,
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { tags: ["prismic"] }, cache: "force-cache" }
                : { next: { revalidate: 5 } },
        ...config,
    });

    prismicNext.enableAutoPreviews({ client });

    return client;
};

async function fetchRedirects() {
    try {
        const client = createClient();

        const data = await client.getSingle("redirects");

        console.log(data);

        return data.data.redirects;
    } catch (error) {
        console.log(error);
    }
}

const nextConfig = async () => {
    const redirectsData = await fetchRedirects();

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
            if (redirects?.length > 0) return redirects;
        },
    };
};

export default withPlaiceholder(nextConfig);

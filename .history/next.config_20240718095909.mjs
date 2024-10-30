import withPlaiceholder from "@plaiceholder/next";
import * as prismic from "@prismicio/client";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

const createClient = (config) => {
    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { tags: ["prismic"] }, cache: "force-cache" }
                : { next: { revalidate: 1 } },
        ...config,
    });

    return client;
};

async function getRedirects() {
    const client = createClient();
    const data = await client.getSingle("redirects");
    const redirectsData = data.data.redirects;
    return redirectsData;
}

const redirects = getRedirects;

/** @type {import('next').NextConfig} */

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
};

export default withPlaiceholder(nextConfig);

/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

import { createClient } from "@/prismicio";

async function fetchRedirects() {
    try {
        const client = createClient();

        const data = await client.getSingle("redirects");

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
    };
};

export default withPlaiceholder(nextConfig);
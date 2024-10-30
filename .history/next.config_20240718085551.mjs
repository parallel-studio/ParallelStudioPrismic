/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = async () => {
    const redirectsData = await fetchCMSData({
        filter: { type: "redirect" },
    });

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

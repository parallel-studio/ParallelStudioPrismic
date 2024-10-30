/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

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
    };
};

export default withPlaiceholder(nextConfig);

const prismic = require("@prismicio/client");

const sm = require("./slicemachine.config.json");

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
    return {
        reactStrictMode: true,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "image.mux.com",
                    port: "",
                },
            ],
        },
    };
};

module.exports = nextConfig;

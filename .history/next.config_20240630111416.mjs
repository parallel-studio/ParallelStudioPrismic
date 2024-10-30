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

export.default = nextConfig;

const prismic = require("@prismicio/client");

const sm = require("./slicemachine.config.json");

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
    const client = prismic.createClient(sm.repositoryName);

    const repository = await client.getRepository();
    const locales = repository.languages.map((lang) => lang.id);

    return {
        reactStrictMode: true,
    };
};

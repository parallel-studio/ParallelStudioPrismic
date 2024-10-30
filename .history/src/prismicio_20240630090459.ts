import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import config from "../slicemachine.config.json";

export const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

const routes: prismic.ClientConfig["routes"] = [
    {
        type: "page",
        path: "/:uid",
    },
    {
        type: "page",
        uid: "home",
        path: "/",
    },
    {
        type: "category",
        path: "/work/category/:uid",
    },
    {
        type: "client",
        path: "/work/:uid",
    },
    {
        type: "project",
        path: "/work/:client/:uid",
        resolvers: {
            client: "client",
        },
    },
    {
        type: "settings",
        path: "/",
    },
    {
        type: "navigation",
        path: "/",
    },
];

export const createClient = (config: prismic.ClientConfig) => {
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

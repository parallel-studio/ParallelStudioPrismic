import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

export const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

const routes: prismic.ClientConfig["routes"] = [
    {
        type: "page",
        path: "/:uid",
        lang: "*",
    },
    {
        type: "page",
        uid: "home",
        path: "/",
        lang: "*",
    },
    {
        type: "project",
        path: "/projects/:uid",
        lang: "*",
    },
    {
        type: "settings",
        path: "/",
        lang: "*",
    },
    {
        type: "navigation",
        path: "/",
        lang: "*",
    },
];

export const createClient = (config: prismic.ClientConfig) => {
    const client = prismic.createClient(repositoryName, {
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

import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import config from "../slicemachine.config.json";

export const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

export const routes: prismic.ClientConfig["routes"] = [
    {
        type: "page",
        path: "/:lang?/:uid",
    },
    {
        type: "page",
        uid: "home",
        path: "/:lang?",
    },
    {
        type: "category",
        path: "/:lang?/work/category/:uid",
    },
    {
        type: "client",
        path: "/:lang?/work/:uid",
    },
    {
        type: "project",
        path: "/:lang?/work/:client/:uid",
        resolvers: {
            client: "client",
        },
    },
    {
        type: "settings",
        path: "/:lang?",
    },
    {
        type: "navigation",
        path: "/:lang?",
    },
    {
        type: "not_found",
        path: "/:lang?",
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

export const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export type SliceContext = Record<
    "context",
    {
        params?: Params;
    } & Record<string, any>
>;

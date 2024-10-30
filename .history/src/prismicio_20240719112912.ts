import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import config from "../slicemachine.config.json";

export const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

export const home = "home";

export const routes: prismic.ClientConfig["routes"] = [
    {
        type: "page",
        path: "/:lang?/:uid",
    },
    {
        type: "page",
        uid: home,
        path: "/:lang?",
    },
    {
        type: "category",
        path: "/:lang?/work/category/:uid",
    },
    // {
    //     type: "client",
    //     path: "/:lang?/work/:uid",
    // },
    {
        type: "project",
        path: "/:lang?/work/:client/:uid",
        resolvers: {
            client: "client",
        },
    },
];

export const createClient = (config: prismic.ClientConfig) => {
    const { fetchOptions: fetchOptionsProps, ...etc } = config;

    const tags = fetchOptionsProps?.next?.tags?.concat(["prismic"]) ?? [
        "prismic",
    ];

    const cache = fetchOptionsProps?.cache ?? "force-cache";

    const fetchOptions: prismic.RequestInitLike =
        process.env.NODE_ENV === "production"
            ? { next: { tags }, cache }
            : { next: { revalidate: 5 } };

    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,
        routes,
        fetchOptions,
        ...etc,
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

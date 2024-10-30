import { FC, HTMLAttributes } from "react";

import { asLink, isFilled } from "@prismicio/client";
import clsx from "clsx";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { hasCategoryData } from "@/lib/helpers";
import { createClient } from "@/prismicio";

import styles from "./filter.module.scss";
import { FilterItem } from "./filter-item";
import { FilterLinks } from "./request";

type FilterProps = {
    params: Params;
} & HTMLAttributes<HTMLUListElement>;

export const Filter: FC<FilterProps> = async ({ params, ...rest }) => {
    const client = createClient({});

    const { className, ...etc } = rest;

    const id = "settings";

    const filter = await client.getSingle(id, {
        lang: params.lang,
        fetchLinks: [...FilterLinks],
    });

    const categories = filter.data.gallery_filter;

    console.log(filter);

    let items = [
        ...categories?.map((item) => {
            if (
                isFilled.link(item.category) &&
                hasCategoryData(item.category)
            ) {
                const category = item.category;
                return {
                    id: category.id,
                    label: category.data.title as string,
                    path: asLink(category) as string,
                };
            }
        }),
    ]
        ?.filter((item) => item !== undefined)
        ?.sort((a, b) => {
            if (a === undefined || b === undefined) {
                return 0;
            } else {
                return a.label.localeCompare(b.label);
            }
        });

    items =
        items?.length > 0
            ? [
                  {
                      id: "all",
                      label: "All",
                      path: "/work",
                  },
                  ...items,
              ]
            : [];

    return (
        <ul className={clsx(styles.wrapper, className)} {...etc}>
            {items.map((item) => {
                if (item)
                    return (
                        <FilterItem key={item.id} item={item} params={params} />
                    );
            })}
        </ul>
    );
};

import { FC, HTMLAttributes } from "react";

import { asLink, isFilled, LinkType } from "@prismicio/client";
import clsx from "clsx";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { hasCategoryData } from "@/lib/helpers";
import { createClient } from "@/prismicio";

import styles from "./filter.module.scss";
// import { FilterItem } from "./filter-item";
// import { FilterLinks } from "./request";
import { FilterProps } from "@/slices/Filter";

export const Filter: FC<FilterProps> = ({ slice, context }) => {
    const links = slice.primary.links;

    let items = [
        ...links?.map((item) => {
            const category = item.link;
            if (
                isFilled.contentRelationship(category) &&
                isFilled.keyText(item.label)
            ) {
                return {
                    id: category.id,
                    label: item.label,
                    path: asLink(category) as string,
                };
            }
        }),
    ]
        ?.filter((item) => item !== undefined && item !== null)
        ?.sort((a, b) => {
            if (a === undefined || b === undefined) {
                return 0;
            } else {
                return a.label.localeCompare(b.label);
            }
        });

    if (items.length > 0) return <></>;
};

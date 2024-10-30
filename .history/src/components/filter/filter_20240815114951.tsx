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
    items: 
} & HTMLAttributes<HTMLUListElement>;

export const Filter: FC<FilterProps> =  ({ params, ...rest }) => {

    const { className, ...etc } = rest;
   
        return (
            <ul className={clsx(styles.wrapper, className)} {...etc}>
                {items.map((item) => {
                    if (item)
                        return (
                            <FilterItem
                                key={item.id}
                                item={item}
                                params={params}
                            />
                        );
                })}
            </ul>
        );
};

"use client";
import { FC, useEffect, useState } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./filter.module.scss";

export type FilterItemProps = {
    id: string;
    label: string;
    path: string;
};

type FilterItemComponentProps = {
    item: FilterItemProps;
    params: Params;
};

export const FilterItem: FC<FilterItemComponentProps> = ({ item }) => {
    const [current, setCurrent] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setCurrent(pathname === item.path);
    }, [pathname, item]);

    return (
        <li className={styles.item}>
            <Link href={item.path} aria-current={current ? "page" : undefined}>
                {item.label}
            </Link>
        </li>
    );
};

FilterItem.displayName = "FilterItem";

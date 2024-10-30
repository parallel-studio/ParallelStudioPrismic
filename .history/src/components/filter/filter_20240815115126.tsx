import { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import styles from "./filter.module.scss";
import { FilterItem, FilterItemProps } from "./filter-item";

type FilterProps = {
    items: FilterItemProps[];
} & HTMLAttributes<HTMLUListElement>;

export const Filter: FC<FilterProps> = ({ items, ...rest }) => {
    const { className, ...etc } = rest;

    return (
        <ul className={clsx(styles.wrapper, className)} {...etc}>
            {items.map((item) => {
                if (item) return <FilterItem key={item.id} item={item} />;
            })}
        </ul>
    );
};

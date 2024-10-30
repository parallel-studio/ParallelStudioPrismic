import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FilterComponent from "@/blocks/filter";
import { FC } from "react";

/**
 * Props for `Filter`.
 */
export type FilterProps = SliceComponentProps<Content.FilterSlice>;

/**
 * Component for "Filter" Slices.
 */
const Filter: FC<FilterProps> = (props: FilterProps) => {
    return <FilterComponent {...props} />;
};

export default Filter;

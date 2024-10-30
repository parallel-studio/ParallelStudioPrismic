import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FilterComponent from "@/blocks/filter";

/**
 * Props for `Filter`.
 */
export type FilterProps = SliceComponentProps<Content.FilterSlice>;

/**
 * Component for "Filter" Slices.
 */
const Filter = (props: FilterProps): JSX.Element => {
    return <FilterComponent {...props} />;
};

export default Filter;

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Filter`.
 */
export type FilterProps = SliceComponentProps<Content.FilterSlice>;

/**
 * Component for "Filter" Slices.
 */
const Filter = ({ slice }: FilterProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for filter (variation: {slice.variation}) Slices
    </section>
  );
};

export default Filter;

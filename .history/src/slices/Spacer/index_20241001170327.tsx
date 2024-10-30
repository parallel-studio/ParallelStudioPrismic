import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import SpacerBlock from "./component";
/**
 * Props for `Spacer`.
 */
export type SpacerProps = SliceComponentProps<Content.SpacerSlice>;

/**
 * Component for "Spacer" Slices.
 */
const Spacer = ({ slice }: SpacerProps): JSX.Element => {
    return <SpacerBlock spacing={slice.primary.size} />;
};

export default Spacer;

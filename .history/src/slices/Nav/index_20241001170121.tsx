import { FC } from "react";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import NavComponent from "./component";

/**
 * Props for `Filter`.
 */
export type NavProps = SliceComponentProps<Content.NavSlice>;

/**
 * Component for "Filter" Slices.
 */
const Nav: FC<NavProps> = (props: NavProps) => {
    return <NavComponent {...props} />;
};

export default Nav;

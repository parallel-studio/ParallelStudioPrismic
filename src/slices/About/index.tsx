import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { SliceContext } from "@/prismicio";

import AboutComponent from "./component";
/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice> & SliceContext;

/**
 * Component for "About" Slices.
 */
const About = (props: AboutProps): JSX.Element => {
  return <AboutComponent {...props} />;
};

export default About;

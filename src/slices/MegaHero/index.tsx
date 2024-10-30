import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import MegaHeroComponent from "./component";

/**
 * Props for `MegaHero`.
 */
export type MegaHeroProps = SliceComponentProps<Content.MegaHeroSlice>;

/**
 * Component for "MegaHero" Slices.
 */
const MegaHero = ({ slice }: MegaHeroProps): JSX.Element => {
  return <MegaHeroComponent slice={slice} />;
};

export default MegaHero;

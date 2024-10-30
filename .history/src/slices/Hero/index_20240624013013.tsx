import { FC } from "react";

import * as prismic from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

type HeroProps = SliceComponentProps<prismic.Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
    return (
        <section className="relative bg-slate-900 text-white">{"hero"}</section>
    );
};

export default Hero;

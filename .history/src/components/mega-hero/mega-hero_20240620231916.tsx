import React from "react";

import { PrismicRichText } from "@prismicio/react";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    return (
        <div className={styles.mega}>
            <PrismicRichText render={slice.primary.slogan} />
            <div className={styles.carousel}></div>
        </div>
    );
};

import React from "react";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    megahero: MegaHeroSlice;
};

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({
    title,
    subtitle,
    image,
}) => {
    return (
        <div className={styles.mega}>
            <img src={image} alt="Mega Hero" className="mega-hero__image" />
            <div className={styles.carousel}></div>
        </div>
    );
};

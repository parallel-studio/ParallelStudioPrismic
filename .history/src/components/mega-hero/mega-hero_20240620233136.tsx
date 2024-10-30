import React from "react";
import HorizontalScroll from "react-scroll-horizontal";

import { PrismicRichText } from "@prismicio/react";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel}>
                <HorizontalScroll>
                    <div className={styles.carousel__item}>asdada</div>
                    <div className={styles.carousel__item}>asdada</div>
                    <div className={styles.carousel__item}>asdada</div>
                </HorizontalScroll>
            </div>
        </div>
    );
};

"use client";
import React from "react";

import { PrismicRichText } from "@prismicio/react";
import { useInView } from "framer-motion";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    const { ref, inView } = useInView({
        triggerOnce: false,
    });

    React.useEffect(() => {
        if (inView) {
            // Disable body scroll
            document.body.style.overflow = "hidden";
        } else {
            // Enable body scroll
            document.body.style.overflow = "auto";
        }
    }, [inView]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel}>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
                <div className={styles.carousel__item}>asdada</div>
            </div>
        </div>
    );
};

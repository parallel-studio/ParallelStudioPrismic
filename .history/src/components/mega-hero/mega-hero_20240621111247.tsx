"use client";
import React, { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { useInView } from "framer-motion";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            // Disable body scroll
            document.body.style.overflow = "hidden";
        } else {
            // Enable body scroll
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isInView && ref.current) {
                ref.current.scrollLeft += e.deltaY;
            }
        };

        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel} ref={ref}>
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

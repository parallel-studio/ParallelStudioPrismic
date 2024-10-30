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
                const targetScroll = ref.current.scrollLeft + e.deltaY;

                const animateScroll = (timestamp: number) => {
                    if (!ref.current) return;

                    const progress = Math.min(1, (timestamp - start) / 200);
                    ref.current.scrollLeft =
                        startScroll + progress * (targetScroll - startScroll);

                    if (progress < 1) {
                        requestId = requestAnimationFrame(animateScroll);
                    }
                };

                const start = performance.now();
                const startScroll = ref.current.scrollLeft;

                if (requestId) {
                    cancelAnimationFrame(requestId);
                }

                requestId = requestAnimationFrame(animateScroll);
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

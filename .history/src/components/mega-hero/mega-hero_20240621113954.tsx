"use client";
import React, { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { useInView } from "framer-motion";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

const ITEMS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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

    useEffect(() => {
        const carousel = ref.current;
        if (carousel) {
            const children = carousel.children as HTMLCollectionOf<HTMLElement>;

            const handleMouseEnter = () => {
                for (let i = 0; i < children.length; i++) {
                    children[i].style.animationPlayState = "paused";
                }
            };

            const handleMouseLeave = () => {
                for (let i = 0; i < children.length; i++) {
                    children[i].style.animationPlayState = "running";
                }
            };

            carousel.addEventListener("mouseenter", handleMouseEnter);
            carousel.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                carousel.removeEventListener("mouseenter", handleMouseEnter);
                carousel.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel} ref={ref}>
                {ITEMS.map((_, index) => (
                    <div key={index} className={styles.carousel__item}>
                        {index}
                    </div>
                ))}
                <div className={styles.carousel__item}>{"THE END"}</div>
            </div>
        </div>
    );
};

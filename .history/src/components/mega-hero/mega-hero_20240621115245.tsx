"use client";
import React, { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { useAnimation, useInView } from "framer-motion";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

const ITEMS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(wrapperRef);
    const controls = useAnimation();

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
            if (isInView && wrapperRef.current) {
                wrapperRef.current.scrollLeft += e.deltaY;
            }
        };

        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView]);

    // useEffect(() => {
    //     const carousel = carouselRef.current;
    //     if (carousel) {
    //         const children = carousel.children as HTMLCollectionOf<HTMLElement>;

    //         const handleMouseEnter = () => {
    //             for (let i = 0; i < children.length; i++) {
    //                 children[i].style.animationPlayState = "paused";
    //             }
    //         };

    //         const handleMouseLeave = () => {
    //             for (let i = 0; i < children.length; i++) {
    //                 children[i].style.animationPlayState = "running";
    //             }
    //         };

    //         carousel.addEventListener("mouseenter", handleMouseEnter);
    //         carousel.addEventListener("mouseleave", handleMouseLeave);

    //         return () => {
    //             carousel.removeEventListener("mouseenter", handleMouseEnter);
    //             carousel.removeEventListener("mouseleave", handleMouseLeave);
    //         };
    //     }
    // }, []);

    useEffect(() => {
        const carousel = carouselRef.current;

        const handleMouseEnter = () => {
            controls.stop();
        };

        const handleMouseLeave = () => {
            controls.start({
                x: "-50%",
                transition: { duration: 30, repeat: Infinity, ease: "linear" },
            });
        };

        if (carousel) {
            carousel.addEventListener("mouseenter", handleMouseEnter);
            carousel.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener("mouseenter", handleMouseEnter);
                carousel.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [controls]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel_wrapper} ref={wrapperRef}>
                <div className={styles.carousel} ref={carouselRef}>
                    {ITEMS.map((_, index) => (
                        <div key={index} className={styles.carousel_item}>
                            {index}
                        </div>
                    ))}
                    <div className={styles.carousel_item}>{"THE END"}</div>
                </div>
            </div>
        </div>
    );
};

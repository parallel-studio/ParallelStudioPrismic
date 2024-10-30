"use client";
import React, { useEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import {
    motion,
    useAnimation,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";

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

    const { scrollYProgress } = useScroll();
    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

    useEffect(() => {
        const carousel = carouselRef.current;

        const animationStops = () => {
            controls.stop();
        };

        const animationStarts = () => {
            controls.start({
                x: x.get(),
                transition: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                },
            });
        };

        if (carousel) {
            animationStarts();

            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            return () => {
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
            };
        }
    }, [controls, x]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel_wrapper} ref={wrapperRef}>
                <div className={styles.carousel} ref={carouselRef}>
                    {ITEMS.map((_, index) => (
                        <motion.div
                            key={index}
                            className={styles.carousel_item}
                            animate={controls}
                        >
                            {index}
                        </motion.div>
                    ))}
                    <div className={styles.carousel_item}>{"THE END"}</div>
                </div>
            </div>
        </div>
    );
};

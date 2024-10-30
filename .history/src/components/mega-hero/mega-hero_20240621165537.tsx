"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

gsap.registerPlugin(ScrollToPlugin);

const ITEMS = [{ ar: "h" }, { ar: "h" }, { ar: "v" }, { ar: "h" }];

export const MegaHeroComponent: React.FC<MegaHeroProps> = ({ slice }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(wrapperRef);

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        const handleWheel = (e: WheelEvent) => {
            if (isInView && carousel) {
                carousel.scrollLeft += e.deltaY;
            }
        };

        // Add the event listener with options to be able to call preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView, wrapperRef]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            const animationStarts = () => {
                gsap.to(carousel, {
                    scrollTo: {
                        x: carousel.scrollWidth + 300,
                        autoKill: true,
                        onAutoKill: () => setTimeout(animationStarts, 1000),
                    },
                    duration: totalScrollLength / 18,
                    ease: "none",
                    onComplete: () => {
                        // Restart the animation when it reaches the end
                        setTimeout(animationStarts, 1000);
                    },
                });
            };

            const animationStops = () => {
                gsap.killTweensOf(carousel);
            };

            // Add scroll event listener to detect manual scroll
            // carousel.addEventListener("scroll", animationStops);
            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            // Start the animation initially
            setTimeout(animationStarts, 1000);

            return () => {
                // carousel.removeEventListener("scroll", animationStops);
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                animationStops(); // Ensure to kill the animation when the component unmounts
            };
        }
    }, [wrapperRef]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel}>
                <div className={styles.carousel_wrapper} ref={wrapperRef}>
                    {ITEMS.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.carousel_item,
                                _.ar === "h" ? styles.h : styles.v
                            )}
                        >
                            {index}
                        </div>
                    ))}
                    <aside className={clsx(styles.end)}>{"THE END"}</aside>
                </div>
            </div>
        </div>
    );
};

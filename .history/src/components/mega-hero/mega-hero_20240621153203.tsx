"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";

import { PrismicRichText } from "@prismicio/react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

gsap.registerPlugin(ScrollToPlugin);

const ITEMS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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

    // useEffect(() => {
    //     const carousel = wrapperRef.current;

    //     const handleWheel = (e: WheelEvent) => {
    //         if (isInView && carousel) {
    //             carousel.scrollLeft += e.deltaY;
    //         }
    //     };

    //     window.addEventListener("wheel", handleWheel);

    //     return () => {
    //         window.removeEventListener("wheel", handleWheel);
    //     };
    // }, [isInView, wrapperRef]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        const handleWheel = (e: WheelEvent) => {
            if (isInView && carousel) {
                e.preventDefault(); // Prevent the default scroll behavior
                const newScrollPosition = carousel.scrollLeft + e.deltaY;

                // Use GSAP to animate to the new scroll position with easing
                gsap.to(carousel, {
                    scrollLeft: newScrollPosition,
                    duration: 0.2, // Adjust the duration for more/less lag
                    ease: "linear", // Adjust the easing function for different effects
                });
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
            const totalScrollLength = carousel.scrollWidth;

            const animationStarts = () => {
                gsap.to(carousel, {
                    scrollTo: {
                        x: "max",
                        autoKill: true,
                        onAutoKill: () => setTimeout(animationStarts, 0),
                    },
                    duration: totalScrollLength / 18,
                    ease: "linear",
                });
            };

            const animationStops = () => {
                gsap.killTweensOf(carousel);
            };

            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            // Start the animation initially
            animationStarts();

            return () => {
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

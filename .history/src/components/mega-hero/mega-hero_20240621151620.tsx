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
    const carouselRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef);

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

        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView, wrapperRef]);

    // useLayoutEffect(() => {
    //     const carousel = wrapperRef.current;

    //     if (carousel) {
    //         const totalScrollLength = carousel.scrollWidth;

    //         const animationStarts = () => {
    //             gsap.to(carousel, {
    //                 scrollTo: {
    //                     x: "max",
    //                     autoKill: true,
    //                     onAutoKill: () => setTimeout(animationStarts, 500),
    //                 },
    //                 duration: totalScrollLength / 18,
    //                 ease: "none",
    //                 onComplete: () => {},
    //             });
    //         };

    //         const animationStops = () => {
    //             gsap.killTweensOf(carousel);
    //         };

    //         carousel.addEventListener("mouseenter", animationStops);
    //         carousel.addEventListener("mouseleave", animationStarts);

    //         // Start the animation initially
    //         animationStarts();

    //         return () => {
    //             carousel.removeEventListener("mouseenter", animationStops);
    //             carousel.removeEventListener("mouseleave", animationStarts);
    //             animationStops(); // Ensure to kill the animation when the component unmounts
    //         };
    //     }
    // }, [wrapperRef]);

    useLayoutEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;
            let start: any = null;
            let requestId: any;

            const scrollSpeed = totalScrollLength / (3000 / 16); // Adjust 3000 to control duration, 16 approximates frame duration in ms

            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const scrollAmount = (progress * scrollSpeed) / 1000; // Adjust scroll speed

                carousel.scrollLeft = scrollAmount;

                if (scrollAmount < totalScrollLength) {
                    requestId = window.requestAnimationFrame(step);
                }
            };

            const animationStarts = () => {
                start = null; // Reset start time
                requestId = window.requestAnimationFrame(step);
            };

            const animationStops = () => {
                if (requestId) {
                    window.cancelAnimationFrame(requestId);
                }
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
            <div className={styles.carousel} ref={carouselRef}>
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

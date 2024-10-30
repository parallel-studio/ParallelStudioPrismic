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

        if (carousel) {
            const handleWheel = (event: any) => {
                event.preventDefault(); // Prevent default scroll behavior

                const scrollAmount = event.deltaY; // Adjust this value if necessary
                const newScrollPosition = carousel.scrollLeft + scrollAmount;

                gsap.to(carousel, {
                    scrollLeft: newScrollPosition,
                    duration: 0.5, // Duration of the scroll animation, adjust for more/less lag
                    ease: "power1.out", // Easing function for a smooth effect, customize as needed
                });
            };

            carousel.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                carousel.removeEventListener("wheel", handleWheel);
            };
        }
    }, [wrapperRef]); // Make sure to include any dependencies your effect relies on

    useEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel) {
            const totalScrollLength = carousel.scrollWidth;

            const animationStarts = () => {
                gsap.to(carousel, {
                    scrollTo: {
                        x: "max",
                        autoKill: true,
                        onAutoKill: () => setTimeout(animationStarts, 500),
                    },
                    duration: totalScrollLength / 18,
                    ease: "linear",
                    modifiers: {
                        scrollLeft: (scrollLeft) => {
                            // Assuming you want to ease the scroll as it approaches the end
                            const progress = scrollLeft / totalScrollLength;
                            const easedProgress = 1 - Math.pow(1 - progress, 2); // Example of an ease-out effect

                            return totalScrollLength * easedProgress + "px";
                        },
                    },
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
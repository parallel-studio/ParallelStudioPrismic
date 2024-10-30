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
    const carouselRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef);
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
            if (isInView && carouselRef.current) {
                carouselRef.current.scrollLeft += e.deltaY;
            }
        };

        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView, carouselRef]);

    // useEffect(() => {
    //     const carousel = wrapperRef.current;

    //     if (carousel && controls && x) {
    //         const totalScrollLength =
    //             carousel.scrollWidth - carousel.clientWidth;

    //         const animationStops = () => {
    //             controls.stop();
    //         };

    //         const animationStarts = () => {
    //             const currentScrollPosition = carousel.scrollLeft;
    //             console.log(currentScrollPosition);
    //             controls.start({
    //                 x: [currentScrollPosition, -totalScrollLength],
    //                 transition: {
    //                     duration:
    //                         (totalScrollLength - currentScrollPosition) / 10, // Adjust speed here
    //                     ease: "linear",
    //                 },
    //             });
    //         };
    //         carousel.addEventListener("mouseenter", animationStops);
    //         carousel.addEventListener("mouseleave", animationStarts);

    //         animationStarts();

    //         return () => {
    //             carousel.removeEventListener("mouseenter", animationStops);
    //             carousel.removeEventListener("mouseleave", animationStarts);
    //         };
    //     }
    // }, [controls, x, wrapperRef]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel && controls) {
            // const totalScrollLength =
            //     carousel.scrollWidth - carousel.clientWidth;

            // const animationStops = () => {
            //     controls.stop();
            // };

            // const animationStarts = () => {
            //     // controls.start({
            //     //     x: -totalScrollLength,
            //     //     transition: {
            //     //         duration:
            //     //             (totalScrollLength - carousel.scrollLeft) / 10, // Adjust speed here
            //     //         ease: "linear",
            //     //     },
            //     // });
            //     carousel.scrollTo({
            //         left: 5000,
            //         behavior: "smooth",
            //     });
            // };

            // carousel.addEventListener("mouseenter", animationStops);
            // carousel.addEventListener("mouseleave", animationStarts);

            // animationStarts();

            // return () => {
            //     carousel.removeEventListener("mouseenter", animationStops);
            //     carousel.removeEventListener("mouseleave", animationStarts);
            // };

            // Fonction pour démarrer le défilement automatique
            function startAutoScroll() {
                let scrollSpeed = 1; // Ajustez la vitesse ici (pixels par intervalle)
                let interval = 30; // Ajustez l'intervalle ici (en millisecondes)
                let scrollDirection = 1; // 1 pour descendre, -1 pour monter
                let autoScrollInterval: any;

                function autoScroll() {
                    // Défilement de la page par incréments
                    window.scrollBy(0, scrollSpeed * scrollDirection);
                    // Arrêter le défilement automatique si la fin de la page est atteinte
                    /* if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight || window.pageYOffset === 0) {
        scrollDirection *= -1; // Inverser la direction de défilement
      } */
                }

                autoScrollInterval = setInterval(autoScroll, interval);

                // Arrêter le défilement automatique au survol
                carousel.addEventListener("mouseenter", function () {
                    clearInterval(autoScrollInterval);
                });

                // Reprendre le défilement automatique quand la souris quitte
                hoverElement.addEventListener("mouseleave", function () {
                    autoScrollInterval = setInterval(autoScroll, interval);
                });
            }

            function resetScroll() {
                window.scrollTo(0, 0);
            }

            // window.scrollTo(0, 0);
            // document.location = "#";

            setTimeout(resetScroll, 500);

            // Commencez le défilement automatique après un délai
            setTimeout(startAutoScroll, 1000); // Dé
        }
    }, [controls, wrapperRef]);

    return (
        <div className={styles.mega}>
            <PrismicRichText field={slice.primary?.slogan} />
            <div className={styles.carousel} ref={carouselRef}>
                <motion.div
                    className={styles.carousel_wrapper}
                    ref={wrapperRef}
                    animate={controls}
                >
                    {ITEMS.map((_, index) => (
                        <div key={index} className={styles.carousel_item}>
                            {index}
                        </div>
                    ))}
                    <div className={styles.carousel_item}>{"THE END"}</div>
                </motion.div>
            </div>
        </div>
    );
};

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
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import { MegaHeroSlice } from "../../../prismicio-types";
import styles from "./mega-hero.module.scss";

type MegaHeroProps = {
    slice: MegaHeroSlice;
};

gsap.registerPlugin(ScrollToPlugin);

const ITEMS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

// function startAutoScroll(element: HTMLElement) {
//     let scrollSpeed = 1; // Ajustez la vitesse ici (pixels par intervalle)
//     let interval = 30; // Ajustez l'intervalle ici (en millisecondes)
//     let scrollDirection = 1; // 1 pour descendre, -1 pour monter
//     let autoScrollInterval: any;

//     function autoScroll() {
//         // Défilement de la page par incréments
//         element.scrollTo(100000, scrollSpeed * scrollDirection);
//         // Arrêter le défilement automatique si la fin de la page est atteinte
//         /* if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight || window.pageYOffset === 0) {
// scrollDirection *= -1; // Inverser la direction de défilement
// } */
//     }

//     autoScrollInterval = setInterval(autoScroll, interval);

//     // Arrêter le défilement automatique au survol
//     element.addEventListener("mouseenter", function () {
//         clearInterval(autoScrollInterval);
//     });

//     // Reprendre le défilement automatique quand la souris quitte
//     element.addEventListener("mouseleave", function () {
//         autoScrollInterval = setInterval(autoScroll, interval);
//     });
// }

// function resetScroll() {
//     window.scrollTo(0, 0);
// }

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

    // useEffect(() => {
    //     const carousel = wrapperRef.current;

    //     if (carousel && controls) {
    //         const totalScrollLength =
    //             carousel.scrollWidth - carousel.clientWidth;

    //         let shouldContinueAnimation = true;

    //         const animationStops = () => {
    //             shouldContinueAnimation = false;
    //         };

    //         const animationStarts = () => {
    //             shouldContinueAnimation = true;
    //             const startTime = performance.now();
    //             const startScrollLeft = carousel.scrollLeft;
    //             const scrollDistance = totalScrollLength - startScrollLeft;

    //             const animateScroll = (currentTime: number) => {
    //                 if (!shouldContinueAnimation) return;

    //                 const elapsedTime = currentTime - startTime;
    //                 const progress = Math.min(
    //                     elapsedTime / (scrollDistance / 10),
    //                     1
    //                 );
    //                 carousel.scrollLeft =
    //                     startScrollLeft + progress * scrollDistance;

    //                 if (progress < 1) {
    //                     window.requestAnimationFrame(animateScroll);
    //                 }
    //             };

    //             window.requestAnimationFrame(animateScroll);
    //         };
    //         carousel.addEventListener("mouseenter", animationStops);
    //         carousel.addEventListener("mouseleave", animationStarts);

    //         setTimeout(animationStarts, 1000); // Delay in milliseconds

    //         return () => {
    //             carousel.removeEventListener("mouseenter", animationStops);
    //             carousel.removeEventListener("mouseleave", animationStarts);
    //         };

    //         // Fonction pour démarrer le défilement automatique

    //         // window.scrollTo(0, 0);
    //         // document.location = "#";

    //         // setTimeout(() => resetScroll(), 1000); // Dé

    //         // // Commencez le défilement automatique après un délai
    //         // setTimeout(() => startAutoScroll(carousel), 1000); // Dé
    //     }
    // }, [controls, wrapperRef]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            const animationStarts = () => {
                console.log("starts");
                gsap.to(carousel, {
                    scrollTo: { x: "max", autoKill: true },
                    duration: totalScrollLength / 500, // Adjust duration based on total scroll length
                    ease: "linear",
                    onComplete: () => {
                        // Optionally, scroll back to start or any other actions upon completion
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
                gsap.killTweensOf(carousel); // Ensure to kill the animation when the component unmounts
            };
        }
    }, [wrapperRef]);

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

"use client";

import React, { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ItemWithMuxData } from ".";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";
import Draggable from "gsap/Draggable";

import styles from "./mega-hero.module.scss";
gsap.registerPlugin(ScrollTrigger, Draggable);

type CarouselAiProps = {
    items: ItemWithMuxData[];
};

export const CarouselAi: FC<CarouselAiProps> = ({ items }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    let startPos = 0; // For touch events

    useEffect(() => {
        const element = carouselRef.current;
        if (!element) return;

        let x = 0; // Current position of the carousel
        const maxScrollWidth = element.scrollWidth - element.clientWidth;

        const onBodyWheel = (e) => {
            // Translate vertical scrolling into horizontal movement for the carousel
            x += -e.deltaY * 0.5; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
            gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
        };

        const onCarouselWheel = (e) => {
            // Direct horizontal scrolling on the carousel
            if (e.deltaX) {
                x += -e.deltaX * 0.5; // Adjust scroll speed for horizontal movement
                x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
                gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
                e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
            }
        };

        window.addEventListener("wheel", onBodyWheel);
        element.addEventListener("wheel", onCarouselWheel);

        const draggableInstance = Draggable.create(element, {
            type: "x",
            inertia: true,
            bounds: { minX: 0, maxX: -maxScrollWidth }, // Adjust according to your carousel's width
            onDrag: function () {
                // Optional: Callback for additional actions during drag
            },
        });

        return () => {
            window.removeEventListener("wheel", onBodyWheel);
            element.removeEventListener("wheel", onCarouselWheel);
            draggableInstance[0].kill();
        };
    }, []);

    return (
        <div className={styles.carousel}>
            <div ref={carouselRef} className={styles.carousel_wrapper}>
                {items.map((item, index) => (
                    <MegaHeroItemClientMobile
                        key={index}
                        item={item}
                        container={carouselRef}
                    />
                ))}
            </div>
        </div>
    );
};

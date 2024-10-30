"use client";

import React, { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ItemWithMuxData } from ".";
import { MegaHeroItemClient } from "./mega-hero-item-client";
import { MegaHeroItemClientMobile } from "./mega-hero-item-client-mobile";

gsap.registerPlugin(ScrollTrigger);

type CarouselAiProps = {
    items: ItemWithMuxData[];
};

export const CarouselAi: FC<CarouselAiProps> = ({ items }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    let startPos = 0; // For touch events

    // useEffect(() => {
    //     const element = carouselRef.current;
    //     if (!element) return;

    //     let x = 0; // Current position of the carousel
    //     const maxScrollWidth = element.scrollWidth - element.clientWidth;

    //     const onBodyWheel = (e) => {
    //         // Translate vertical scrolling into horizontal movement for the carousel
    //         x += e.deltaY * 0.5; // Adjust scroll speed
    //         x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
    //         gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
    //     };

    //     const onCarouselWheel = (e) => {
    //         // Direct horizontal scrolling on the carousel
    //         if (e.deltaX) {
    //             x += e.deltaX * 0.5; // Adjust scroll speed for horizontal movement
    //             x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
    //             gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
    //             e.preventDefault(); // Prevent the default scroll behavior to smoothly handle the carousel movement
    //         }
    //     };

    //     window.addEventListener("wheel", onBodyWheel);
    //     element.addEventListener("wheel", onCarouselWheel);

    //     return () => {
    //         window.removeEventListener("wheel", onBodyWheel);
    //         element.removeEventListener("wheel", onCarouselWheel);
    //     };
    // }, []);

    useEffect(() => {
        const element = carouselRef.current;
        if (!element) return;

        let x = 0; // Current position of the carousel
        const maxScrollWidth = element.scrollWidth - element.clientWidth;

        const onWheel = (e) => {
            x += e.deltaY * 0.5; // Adjust scroll speed
            x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
            gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
        };

        const onTouchStart = (e) => {
            startPos = e.touches[0].pageX;
        };

        const onTouchMove = (e) => {
            const movePos = e.touches[0].pageX;
            const moveDelta = startPos - movePos;
            x += moveDelta * 0.5; // Adjust for sensitivity
            x = Math.max(Math.min(x, 0), -maxScrollWidth); // Prevent scrolling beyond limits
            gsap.to(element, { x, duration: 0.5, ease: "power1.out" });
            startPos = movePos; // Update start position for next move
        };

        element.addEventListener("wheel", onWheel);
        element.addEventListener("touchstart", onTouchStart);
        element.addEventListener("touchmove", onTouchMove);

        return () => {
            element.removeEventListener("wheel", onWheel);
            element.removeEventListener("touchstart", onTouchStart);
            element.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    return (
        <div
            ref={carouselRef}
            style={{
                display: "flex",
                overflow: "hidden",
                width: "100%",
                height: "100vh",
            }}
        >
            {/* Example items in the carousel */}
            {items.map((item, index) => (
                <MegaHeroItemClientMobile
                    key={index}
                    item={item}
                    container={carouselRef}
                />
            ))}
        </div>
    );
};
"use client";

import React, { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ItemWithMuxData } from ".";
import { MegaHeroItemClient } from "./mega-hero-item-client";

gsap.registerPlugin(ScrollTrigger);

type CarouselAiProps = {
    items: ItemWithMuxData[];
};

export const CarouselAi: FC<CarouselAiProps> = ({ items }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = carouselRef.current;

        if (!element) return;
        // Calculate the total width of the carousel to determine the scrolling distance
        const totalWidth = element.scrollWidth - element.offsetWidth;

        // Use GSAP to animate the carousel based on scroll progress
        gsap.to(element, {
            x: () => -totalWidth + "px", // Move the carousel to the left
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top top",
                end: () => "+=" + totalWidth * 2, // Adjust the end point based on the total width
                scrub: true,
                pin: true, // Pin the carousel in place
                anticipatePin: 1,
            },
        });
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
                <MegaHeroItemClient
                    key={index}
                    item={item}
                    container={carouselRef}
                />
            ))}
        </div>
    );
};

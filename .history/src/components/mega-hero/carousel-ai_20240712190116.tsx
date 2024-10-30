"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CarouselAiProps = {
    items: MegaH;
};

export const CarouselAi = () => {
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
            {[...Array(5).keys()].map((i) => (
                <div
                    key={i}
                    style={{
                        flex: "none",
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: `hsl(${i * 75}, 100%, 50%)`,
                    }}
                >
                    Item {i + 1}
                </div>
            ))}
        </div>
    );
};

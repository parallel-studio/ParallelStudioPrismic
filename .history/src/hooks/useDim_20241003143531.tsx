"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

const unDim = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(100%)",
        duration: 0.7,
        ease: "power1.in",
        delay: 0,
    });
};

const dim = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(70%)",
        duration: 1,
        ease: "power1.out",
        delay: 0,
    });
};

const TIMEOUT_ENTER = 1000;
const TIMEOUT_LEAVE = 1250;

export const useDim = () => {
    const [activeElement, setActiveElement] = useState<Element | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (item: Element) => {
        const element = item;
        if (!element) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setActiveElement(element);
        }, TIMEOUT_ENTER);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
            setActiveElement(null);
        }, TIMEOUT_LEAVE);
    };

    useEffect(() => {
        const items = document.querySelectorAll(".dim-cont");

        for (const item of items) {
            const element = item;
            if (element) {
                element.addEventListener("mouseenter", () =>
                    handleMouseEnter(item)
                );
                element.addEventListener("mouseleave", handleMouseLeave);
            }
        }

        return () => {
            for (const item of items) {
                const element = item;
                if (element) {
                    element.removeEventListener("mouseenter", () =>
                        handleMouseEnter(item)
                    );
                    element.removeEventListener("mouseleave", handleMouseLeave);
                }
            }
        };
    }, []);

    useEffect(() => {
        const items = document.querySelectorAll(".dim-cont");

        for (const item of items) {
            const element = item?.querySelector(".dim-el");

            if (!element) {
                return;
            }

            if (!activeElement) {
                unDim(element);
            } else {
                if (activeElement === item) {
                    unDim(element);
                }

                if (activeElement !== item) {
                    dim(element);
                }
            }
        }
    }, [activeElement]);
};

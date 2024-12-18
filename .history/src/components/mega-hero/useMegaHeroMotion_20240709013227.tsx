import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useLayout } from "@/lib/mobile-layout";

let scrollSpeed = 1;
let interval = 30;

let scrollDirection = 1;
let autoScrollInterval: ReturnType<typeof setInterval>;

const autoScroll = () => {
    window.scrollBy({
        left: 0,
        top: scrollSpeed * scrollDirection,
        behavior: "instant",
    });
};

const startAutoScroll = () => {
    autoScrollInterval = setInterval(autoScroll, interval);
};

export const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
};

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const { isMobileLayoutActive } = useLayout();
    const carouselRef = useRef<HTMLDivElement>(null);
    const path = usePathname();

    useEffect(() => {
        const initialBodyHeight = document.body.style.height;

        if (isMobileLayoutActive) return;

        const updateBodyHeight = () => {
            if (document) {
                const carousel_wrapper =
                    document.querySelector(".carousel_wrapper");
                document.body.style.height =
                    carousel_wrapper?.scrollWidth + "px";
            }
        };

        updateBodyHeight();

        window.addEventListener("resize", updateBodyHeight);

        return () => {
            window.removeEventListener("resize", updateBodyHeight);
            document.body.style.height = initialBodyHeight;
        };
    }, [path, isMobileLayoutActive]);

    // useEffect(() => {
    //     const hoverElement = carouselRef.current;

    //     // Stop auto-scroll initially or when conditions change
    //     stopAutoScroll();

    //     if (!isMobileLayoutActive) {
    //         startAutoScroll();
    //         hoverElement?.addEventListener("mouseover", stopAutoScroll);
    //         hoverElement?.addEventListener("mouseleave", startAutoScroll);

    //         // Listen to visibility change to handle tab changes or navigation
    //         document.addEventListener("visibilitychange", () => {
    //             if (document.visibilityState === "hidden") {
    //                 stopAutoScroll();
    //             } else if (!isMobileLayoutActive && hoverElement) {
    //                 startAutoScroll();
    //             }
    //         });
    //     }

    //     return () => {
    //         // Ensure auto-scroll is stopped
    //         stopAutoScroll();
    //         // Correct the event listener removal
    //         hoverElement?.removeEventListener("mouseover", stopAutoScroll);
    //         hoverElement?.removeEventListener("mouseleave", startAutoScroll);
    //         // Remove visibility change listener
    //         document.removeEventListener("visibilitychange", stopAutoScroll);
    //         // Reset scroll position
    //         window.scrollTo(0, 0);
    //     };
    // }, [carouselRef, isMobileLayoutActive, path]);

    useEffect(() => {
        const hoverElement = carouselRef.current;

        if (!isMobileLayoutActive) {
            startAutoScroll();
            hoverElement?.addEventListener("mouseover", stopAutoScroll);
            hoverElement?.addEventListener("mouseleave", startAutoScroll);

            // Stop auto-scroll when navigating away from the page
            window.onbeforeunload = () => {
                stopAutoScroll();
            };
        }

        return () => {
            // Ensure auto-scroll is stopped
            stopAutoScroll();
            // Correct the event listener removal
            hoverElement?.removeEventListener("mouseover", stopAutoScroll);
            hoverElement?.removeEventListener("mouseleave", startAutoScroll);
            // Remove the onbeforeunload event listener to prevent memory leaks
            window.onbeforeunload = null;
        };
    }, [carouselRef, isMobileLayoutActive]);

    return { carouselRef };
};

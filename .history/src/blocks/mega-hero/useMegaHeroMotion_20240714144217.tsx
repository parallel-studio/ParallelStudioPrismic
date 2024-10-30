import { use, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useLayout } from "@/context/layout";

import { useMegaHeroApi } from "./context";

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
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

    const carouselRef = useRef<HTMLDivElement>(null);
    const path = usePathname();

    // useEffect(() => {
    //     const initialBodyHeight = document.body.style.height;

    //     if (isMobileLayoutActive) return;

    //     const updateBodyHeight = () => {
    //         if (document) {
    //             const carousel_wrapper =
    //                 document.querySelector(".carousel_wrapper");
    //             document.body.style.height =
    //                 carousel_wrapper?.scrollWidth + "px";
    //         }
    //     };

    //     updateBodyHeight();

    //     window.addEventListener("resize", updateBodyHeight);

    //     return () => {
    //         window.removeEventListener("resize", updateBodyHeight);
    //         document.body.style.height = initialBodyHeight;
    //     };
    // }, [path, isMobileLayoutActive]);

    // useEffect(() => {
    //     const hoverElement = carouselRef.current;

    //     if (isPopupOpen) {
    //         stopAutoScroll();
    //         return;
    //     }

    //     if (!isMobileLayoutActive) {
    //         startAutoScroll();
    //         hoverElement?.addEventListener("mouseover", stopAutoScroll);
    //         hoverElement?.addEventListener("mouseleave", startAutoScroll);

    //         window.onbeforeunload = () => {
    //             stopAutoScroll();
    //         };
    //     }

    //     return () => {
    //         // Ensure auto-scroll is stopped
    //         stopAutoScroll();
    //         // Correct the event listener removal
    //         hoverElement?.removeEventListener("mouseover", stopAutoScroll);
    //         hoverElement?.removeEventListener("mouseleave", startAutoScroll);
    //         // Remove the onbeforeunload event listener to prevent memory leaks
    //         window.onbeforeunload = null;
    //         scrollTo(0, 0);
    //     };
    // }, [carouselRef, isMobileLayoutActive, isPopupOpen]);

    return { carouselRef };
};

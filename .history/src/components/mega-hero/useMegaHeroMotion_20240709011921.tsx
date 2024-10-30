import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
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

    useEffect(() => {
        const hoverElement = carouselRef.current;

        stopAutoScroll();

        if (isMobileLayoutActive) {
            stopAutoScroll();
        }

        if (!isMobileLayoutActive) {
            let timeout: ReturnType<typeof setTimeout>;

            const handleMouseLeave = () => {
                timeout = setTimeout(() => {
                    startAutoScroll();
                }, 1000);
            };

            hoverElement?.addEventListener("mouseover", stopAutoScroll);
            hoverElement?.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            stopAutoScroll();
            clearTimeout(timeout);
            hoverElement?.removeEventListener("mouseover", stopAutoScroll);
            hoverElement?.removeEventListener("mouseleave", handleMouseLeave);
            window.scrollTo(0, 0);
        };
    }, [carouselRef, isMobileLayoutActive, path]);

    return { carouselRef };
};

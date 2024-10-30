import { useEffect, useLayoutEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useIsomorphicLayoutEffect from "@/lib/isomorphic-layout";
import { useLayout } from "@/lib/mobile-layout";

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

    useLayoutEffect(() => {
        const hoverElement = carouselRef.current;

        let scrollSpeed = 1;
        let interval = 30;

        let scrollDirection = 1;
        let autoScrollInterval: ReturnType<typeof setInterval>;

        function autoScroll() {
            window.scrollBy({
                left: 0,
                top: scrollSpeed * scrollDirection,
                behavior: "instant",
            });
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(autoScroll, interval);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        if (isMobileLayoutActive) {
            stopAutoScroll();
        }

        if (!isMobileLayoutActive) {
            stopAutoScroll();
            startAutoScroll();
            hoverElement?.addEventListener("mouseover", stopAutoScroll);
            hoverElement?.addEventListener("click", stopAutoScroll);
            hoverElement?.addEventListener("mouseleave", startAutoScroll);
            hoverElement?.addEventListener("mousedown", stopAutoScroll);
        }

        return () => {
            stopAutoScroll();
            hoverElement?.removeEventListener("mouseover", startAutoScroll);
            hoverElement?.addEventListener("click", stopAutoScroll);
            hoverElement?.removeEventListener("mouseleave", stopAutoScroll);
            hoverElement?.removeEventListener("mousedown", stopAutoScroll);

            window.scrollTo(0, 0);
        };
    }, [carouselRef, isMobileLayoutActive, path]);

    return { carouselRef };
};

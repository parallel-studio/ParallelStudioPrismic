import { useEffect, useRef } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useLayout } from "@/lib/mobile-layout";

type UseMegaHeroProps = {};

export const useMegaHeroMotion = ({}: UseMegaHeroProps) => {
    const { isMobileLayoutActive } = useLayout();
    const carouselRef = useRef<HTMLDivElement>(null);
    const path = usePathname();

    useEffect(() => {
        const initialBodyHeight = document.body.style.height;

        if (!isMobileLayoutActive) {
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
        }

        return () => {
            window.removeEventListener("resize", updateBodyHeight);
            document.body.style.height = initialBodyHeight;
        };
    }, [path, isMobileLayoutActive]);

    useEffect(() => {
        const hoverElement = carouselRef.current;

        let scrollSpeed = isMobileLayoutActive ? 1 : 1; // Ajustez la vitesse ici (pixels par intervalle)
        let interval = isMobileLayoutActive ? 5 : 40; // Ajustez l'intervalle ici (en millisecondes)
        let scrollDirection = 1;
        let autoScrollInterval: ReturnType<typeof setInterval>;

        function startAutoScroll() {
            function autoScroll() {
                window.scrollBy(0, scrollSpeed * scrollDirection);
            }
            autoScrollInterval = setInterval(autoScroll, interval);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        if (isMobileLayoutActive) {
            stopAutoScroll();
        }

        if (!isMobileLayoutActive) {
            setTimeout(startAutoScroll, 2000);
            hoverElement?.addEventListener("mousedown", stopAutoScroll);
            hoverElement?.addEventListener("mouseover", stopAutoScroll);
            hoverElement?.addEventListener("mouseleave", startAutoScroll);
        }

        return () => {
            hoverElement?.removeEventListener("mouseover", startAutoScroll);
            hoverElement?.removeEventListener("mouseleave", stopAutoScroll);
            hoverElement?.removeEventListener("mousedown", stopAutoScroll);
            stopAutoScroll();
            window.scrollTo(0, 0);
        };
    }, [carouselRef, isMobileLayoutActive, path]);

    return { carouselRef };
};

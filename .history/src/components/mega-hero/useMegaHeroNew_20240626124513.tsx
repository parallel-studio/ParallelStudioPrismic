import { RefObject, useCallback, useEffect, useState } from "react";

import { useInView, useIsomorphicLayoutEffect } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type UseMegaHeroProps = {
    container: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const CAROUSEL_ITEM = ".carousel_item";

export const useMegaHeroNew = ({ container }: UseMegaHeroProps) => {
    const isInView = useInView(container);
    const [translateX, setTranslateX] = useState(0);
    const [carouselItems, setCarouselItems] = useState<HTMLElement[]>();

    const fadeIn = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            setTimeout(() => {
                gsap.to(carousel, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                });
            }, 1000);
        }
    }, [container]);

    const autoScrollStarts = useCallback(() => {
        const carousel = container.current;

        if (carousel && carouselItems) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            gsap.to(carouselItems, {
                translateX: -150,
                duration: totalScrollLength / 100,
                ease: "none",
                onUpdate: () => {
                    const matchResult = gsap.getProperty(carouselItems[0], "x");
                    setTranslateX(matchResult);
                },
                onComplete: () => {
                    setTimeout(() => {
                        autoScrollStarts();
                    }, 5000);
                },
                startAt: { x: translateX },
            });
        }
    }, [container, carouselItems, translateX]);

    const autoScrollStops = useCallback(() => {
        const carousel = container.current;
        if (carousel) {
            gsap.killTweensOf(CAROUSEL_ITEM);
        }
    }, [container]);

    const handleManualScroll = useCallback(
        (e: WheelEvent) => {
            const carousel = container.current;
            autoScrollStops();
            setTranslateX((prev) => {
                if (!carousel) return prev;
                const maxTranslateX =
                    -carousel.scrollWidth + carousel.offsetWidth;
                const newTranslateX = prev - e.deltaY * 0.5;
                return Math.min(Math.max(newTranslateX, maxTranslateX), 0);
            });
            setTimeout(autoScrollStarts, 5000);
        },
        [container, autoScrollStops, autoScrollStarts]
    );

    useEffect(() => {
        const carousel = container.current;

        if (isInView && carousel) {
            document.body.style.overflow = "hidden";
            const carouselItems = Array.from(
                carousel.querySelectorAll(CAROUSEL_ITEM)
            );
            setCarouselItems(carouselItems as HTMLElement[]);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView, container]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;
        if (carousel) {
            window.addEventListener("wheel", handleManualScroll, {
                passive: false,
            });
            return () => {
                window.removeEventListener("wheel", handleManualScroll);
            };
        }
    }, [isInView, container, handleManualScroll]);

    useIsomorphicLayoutEffect(() => {
        if (carouselItems) {
            carouselItems.forEach((child: Element) => {
                (child as HTMLElement).style.transform =
                    `translateX(${translateX}px)`;
            });
        }
    }, [translateX, carouselItems]);

    useIsomorphicLayoutEffect(() => {
        const carousel = container.current;

        if (carousel) {
            fadeIn();
            setTimeout(autoScrollStarts, 1500);

            carousel.addEventListener("mouseenter", autoScrollStops);
            carousel.addEventListener("mouseleave", autoScrollStarts);

            return () => {
                carousel.removeEventListener("mouseenter", autoScrollStops);
                carousel.removeEventListener("mouseleave", autoScrollStarts);
                autoScrollStops();
            };
        }
    }, [container, autoScrollStarts, autoScrollStops, fadeIn]);
};

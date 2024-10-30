import { RefObject, useEffect } from "react";

import { useInView } from "framer-motion";

type UseMegaHeroProps = {
    wrapperRef: RefObject<HTMLElement>;
};

export const useMegaHero = ({ wrapperRef }: UseMegaHeroProps) => {
    const isInView = useInView(wrapperRef);

    useEffect(() => {
        if (isInView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isInView]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        const handleWheel = (e: WheelEvent) => {
            if (isInView && carousel) {
                carousel.scrollLeft += e.deltaY;
            }
        };

        // Add the event listener with options to be able to call preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isInView, wrapperRef]);

    useEffect(() => {
        const carousel = wrapperRef.current;

        if (carousel) {
            const totalScrollLength =
                carousel.scrollWidth - carousel.clientWidth;

            const animationStarts = () => {
                gsap.to(carousel, {
                    scrollTo: {
                        x: carousel.scrollWidth + 300,
                        autoKill: true,
                        onAutoKill: () => setTimeout(animationStarts, 1000),
                    },
                    duration: totalScrollLength / 18,
                    ease: "none",
                    onComplete: () => {
                        // Restart the animation when it reaches the end
                        setTimeout(animationStarts, 1000);
                    },
                });
            };

            const animationStops = () => {
                gsap.killTweensOf(carousel);
            };

            // Add scroll event listener to detect manual scroll
            // carousel.addEventListener("scroll", animationStops);
            carousel.addEventListener("mouseenter", animationStops);
            carousel.addEventListener("mouseleave", animationStarts);

            // Start the animation initially
            setTimeout(animationStarts, 1000);

            return () => {
                // carousel.removeEventListener("scroll", animationStops);
                carousel.removeEventListener("mouseenter", animationStops);
                carousel.removeEventListener("mouseleave", animationStarts);
                animationStops(); // Ensure to kill the animation when the component unmounts
            };
        }
    }, [wrapperRef]);
};

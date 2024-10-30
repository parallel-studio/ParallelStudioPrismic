import { RefObject, useEffect } from "react";
import { useHoverDirty } from "react-use";

import gsap from "gsap";

const undimVideo = (element: HTMLElement) => {
    gsap.to(element, {
        filter: "opacity(100%)",
        duration: 0.5,
        ease: "linear",
        delay: 0,
    });
};

const dimVideo = (element: HTMLElement) => {
    gsap.to(element, {
        filter: "opacity(70%)",
        duration: 0.3,
        ease: "power1.out",
        delay: 0,
    });
};

export const useDimEffect = (ref: RefObject<HTMLElement>) => {
    const element = ref.current;
    const isHovering = useHoverDirty(ref);

    useEffect(() => {
        const video = element?.querySelector(".carousel_video") as
            | HTMLAnchorElement
            | HTMLDivElement;

        if (!video) return;

        if (isHovering && element) {
            undimVideo(element);
            document.querySelectorAll(".carousel_video").forEach((el) => {
                if (el !== video) {
                    dimVideo(el as HTMLElement);
                }
            });
        } else if (element) {
            undimVideo(element);
        }
    }, [isHovering, element]);
};

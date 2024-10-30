import { RefObject, use, useEffect } from "react";
import { useHoverDirty } from "react-use";

import gsap from "gsap";

const undimVideo = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(100%)",
        duration: 0.5,
        ease: "linear",
        delay: 0,
    });
};

const dimVideo = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(70%)",
        duration: 0.3,
        ease: "power1.out",
        delay: 0,
        overwrite: "auto",
    });
};

export const useDimEffect = (ref: RefObject<HTMLElement>) => {
    const element = ref.current;
    const video = element?.querySelector(".carousel_video");

    const isHovering = useHoverDirty(ref);

    useEffect(() => {
        const videos = document?.querySelectorAll(".carousel_video");

        if (!video || !videos) return;

        if (isHovering) {
            undimVideo(video);
        } else {
            videos.forEach((el) => {
                dimVideo(el);
            });
        }
    }, [isHovering, video]);
};

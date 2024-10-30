const useDimEffect = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) => {
    useEffect(() => {
        const video = itemContainer.current?.querySelector(
            ".carousel_video"
        ) as HTMLAnchorElement | HTMLDivElement;

        if (!video) return;

        const undimVideo = () => {
            gsap.to(video, {
                filter: "opacity(100%)",
                duration: 0.5,
                ease: "linear",
                delay: 0,
            });
        };

        const dimVideo = () => {
            if (activeItem && !itemIsActive)
                gsap.to(video, {
                    filter: "opacity(70%)",
                    duration: 0.3,
                    ease: "power1.out",
                    delay: 0,
                });
        };

        if (activeItem && !itemIsActive) {
            dimVideo();
        } else {
            undimVideo();
        }
    }, [itemIsActive, activeItem, itemContainer]);
};
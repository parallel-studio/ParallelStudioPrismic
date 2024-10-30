"use client";
import { cloneElement, FC, ReactElement, useEffect, useRef } from "react";

type ExpandProps = {
    element: ReactElement;
};

export const Expand: FC<ExpandProps> = ({ element }) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const currentElement = elementRef.current;

        const handleClick = () => {
            console.log("Expand clicked");
        };

        currentElement?.addEventListener("click", handleClick);

        return () => {
            currentElement?.removeEventListener("click", handleClick);
        };

        if (currentElement) {
            console.log("EXITS");

            const handleClick = () => {
                console.log("Expand clicked");
            };

            currentElement.addEventListener("click", handleClick);

            return () => {
                currentElement.removeEventListener("click", handleClick);
            };
        }
    }, [element]);

    return cloneElement(element, { ref: elementRef });
};

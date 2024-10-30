"use client";
import { cloneElement, FC, ReactElement, useEffect, useRef } from "react";

type ExpandProps = {
    children: ReactElement;
};

export const Expand: FC<ExpandProps> = ({ children: children }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentElement = elementRef.current;

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
    }, [elementRef]);

    return <div ref={elementRef}>{children}</div>;
};

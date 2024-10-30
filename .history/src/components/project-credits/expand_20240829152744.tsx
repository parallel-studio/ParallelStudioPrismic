import { FC, ReactElement, useEffect, useRef } from "react";

type ExpandProps = {
    element: ReactElement;
};

export const Expand: FC<ExpandProps> = ({ element }) => {
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const currentElement = elementRef.current;
        if (currentElement) {
            const handleClick = () => {
                console.log("Expand clicked");
            };

            currentElement.addEventListener("click", handleClick);

            return () => {
                currentElement.removeEventListener("click", handleClick);
            };
        }
    }, [element]);

    return React.cloneElement(element, { ref: elementRef });
};

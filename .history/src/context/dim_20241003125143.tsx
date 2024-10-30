"use client";

import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";

import gsap from "gsap";

const unDim = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(100%)",
        duration: 1,
        ease: "linear",
        delay: 0,
    });
};

const dim = (element: Element) => {
    gsap.to(element, {
        filter: "opacity(70%)",
        duration: 1,
        ease: "linear",
        delay: 0,
    });
};

const TIMEOUT_ENTER = 1250;
const TIMEOUT_LEAVE = 1000;

type ElementObject = RefObject<HTMLElement> | null;

type DimItem = {
    type: "add_item" | "remove_item" | "update_item" | "clear";
    element?: ElementObject;
};

type DimContextProps = {
    register: Dispatch<DimItem>;
    activeElement?: ElementObject;
};

type DimProviderProps = {
    children: ReactNode;
};

type DimOptions = {
    blankOnHoverOut?: boolean;
} | null;

const DimContext = createContext<DimContextProps>({
    register: () => {},
    activeElement: undefined,
});

function reducer(state: DimItem[], action: DimItem) {
    if (action.type === "add_item") {
        if (action.type === "add_item") {
            const isItemPresent = state.some(
                (item) => item.element === action.element
            );
            if (isItemPresent) {
                return state.map((item) =>
                    item.element === action.element ? action : item
                );
            } else {
                return [...state, action];
            }
        }
    }

    if (action.type === "remove_item") {
        return state.filter((item) => item.element !== action.element);
    }

    if (action.type === "update_item") {
        return state.map((item) =>
            item.element === action.element ? action : item
        );
    }

    if (action.type === "clear") {
        return [];
    }

    throw Error("Unknown action.");
}

const DimProvider: FC<DimProviderProps> = ({ children }) => {
    const [items, register] = useReducer(reducer, []);
    const [activeElement, setActiveElement] = useState<Element | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (item: Element) => {
        const element = item;
        if (!element) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setActiveElement(element);
        }, TIMEOUT_ENTER);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
            setActiveElement(null);
        }, TIMEOUT_LEAVE);
    };

    useEffect(() => {
        const items = document.querySelectorAll(".dim-cont");

        for (const item of items) {
            const element = item;
            if (element) {
                element.addEventListener("mouseenter", () =>
                    handleMouseEnter(item)
                );
                element.addEventListener("mouseleave", handleMouseLeave);
            }
        }

        return () => {
            for (const item of items) {
                const element = item;
                if (element) {
                    element.removeEventListener("mouseenter", () =>
                        handleMouseEnter(item)
                    );
                    element.removeEventListener("mouseleave", handleMouseLeave);
                }
            }
        };
    }, []);

    useEffect(() => {
        const items = document.querySelectorAll(".dim-cont");

        console.log("ACTIVE ELEMENT", activeElement);

        for (const item of items) {
            const element = item?.querySelector(".dim-el");

            if (!element) {
                return;
            }

            if (!activeElement) {
                // unDim(element);
            } else {
                if (activeElement === item) {
                    unDim(element);
                }

                if (activeElement !== item) {
                    dim(element);
                }
            }
        }
    }, [activeElement]);

    return (
        <DimContext.Provider value={{ register }}>
            {children}
        </DimContext.Provider>
    );
};

const useDim = () => useContext(DimContext);

export { DimProvider, useDim };

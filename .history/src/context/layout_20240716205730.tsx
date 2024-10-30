"use client";

import {
    createContext,
    FC,
    ReactElement,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useState,
} from "react";

import { Layout, useActiveLayout } from "../hooks/useActiveLayout";

type ElementSizes = {
    height: number;
    width: number;
};

type LayoutContextProps = {
    activeLayout?: Layout;
    headerSize?: ElementSizes;
    setHeader: (header: RefObject<HTMLDivElement>) => void;
};

const LayoutContext = createContext<LayoutContextProps>({
    setHeader: () => {},
});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { activeLayout } = useActiveLayout("mobile");
    const [header, setHeader] = useState<RefObject<HTMLDivElement>>();
    const [headerSize, setHeaderSize] = useState<ElementSizes>();
    const { height } = useWindowSize();

    useEffect(() => {
        if (header?.current) {
            const { height, width } = header.current.getBoundingClientRect();
            setHeaderSize({ height, width });
        }
    }, [header]);

    return (
        <LayoutContext.Provider value={{ activeLayout, setHeader }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

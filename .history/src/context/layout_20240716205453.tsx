"use client";

import {
    createContext,
    FC,
    ReactElement,
    ReactNode,
    RefObject,
    useContext,
    useState,
} from "react";

import { Layout, useActiveLayout } from "../hooks/useActiveLayout";

type ElementSizes = {
    height: number;
    width: number;
};
type LayoutContextProps = {
    activeLayout?: Layout;
    sizes?: ElementSizes;
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

    return (
        <LayoutContext.Provider value={{ activeLayout, setHeader }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

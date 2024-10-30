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
    header?: ElementSizes;
    setHeader: (header: RefObject<ReactElement>) => void;
};

const LayoutContext = createContext<LayoutContextProps>({});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { activeLayout } = useActiveLayout("mobile");
    const [header, setHeader] = useState<RefObject<ReactElement>>();

    return (
        <LayoutContext.Provider value={{ activeLayout, setHeader }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

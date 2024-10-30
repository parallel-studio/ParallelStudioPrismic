"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

import { Layout, useActiveLayout } from "../hooks/useActiveLayout";

type ElementSizes = {
    height: number;
    width: number;
};
type LayoutContextProps = {
    activeLayout?: Layout;
    header?: ElementSizes;
};

const LayoutContext = createContext<LayoutContextProps>({});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { activeLayout } = useActiveLayout("mobile");
    const [header, setHeader] = useState<ElementSizes>({ height: 0, width: 0 });
    return (
        <LayoutContext.Provider value={{ activeLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

"use client";

import { createContext, FC, ReactNode, useContext } from "react";

import { Layout, useActiveLayout } from "@/hooks/useIsMobileLayoutActive";

type LayoutContextProps = {
    activeLayout?: Layout;
};

const LayoutContext = createContext<LayoutContextProps>({});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { activeLayout } = useActiveLayout("mobile");

    return (
        <LayoutContext.Provider value={{ activeLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

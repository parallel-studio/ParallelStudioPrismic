"use client";

import { createContext, FC, ReactNode, useContext } from "react";

import { useActiveLayout } from "@/hooks/useIsMobileLayoutActive";

type LayoutContextProps = {
    activeLayout?: boolean;
};

const LayoutContext = createContext<LayoutContextProps>({});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { activeLayout: activeLayout } = useActiveLayout("mobile");

    return (
        <LayoutContext.Provider value={{ activeLayout: activeLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

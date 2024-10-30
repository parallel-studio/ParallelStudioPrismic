"use client";

import { createContext, FC, ReactNode, useContext } from "react";

import { useIsMobileLayoutActive } from "@/hooks/useIsMobileLayoutActive";

type LayoutContextProps = {
    isMobileLayoutActive?: boolean;
};

const LayoutContext = createContext<LayoutContextProps>({});

type LayoutProviderProps = {
    children: ReactNode;
};

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
    const { isMobileLayoutActive } = useIsMobileLayoutActive(false);

    return (
        <LayoutContext.Provider value={{ isMobileLayoutActive }}>
            {children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => useContext(LayoutContext);

export { LayoutContext, LayoutProvider, useLayout };

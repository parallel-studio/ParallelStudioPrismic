"use client";
import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

import { useTheme } from "@/context/theme";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

type MegaHeroContextProps = {
    item?: MegaHeroSliceDefaultPrimaryItemsItem | null;
    setItem: Dispatch<
        SetStateAction<MegaHeroSliceDefaultPrimaryItemsItem | undefined>
    >;
};

const MegaHeroContext = createContext<MegaHeroContextProps>({
    item: null,
    setItem: () => {},
});

type ProviderProps = {
    children: ReactNode;
};

const MegaHeroProvider: FC<ProviderProps> = ({ children }) => {
    const [item, setItem] = useState<MegaHeroSliceDefaultPrimaryItemsItem>();
    const { setTheme } = useTheme();

    useEffect(() => {
        if (item && "data") {
            setTheme({ color: "black" });
        }
    }, [item, setTheme]);

    return (
        <MegaHeroContext.Provider value={{ item, setItem }}>
            {children}
        </MegaHeroContext.Provider>
    );
};

const useMegaHeroApi = () => useContext(MegaHeroContext);

export { MegaHeroProvider, useMegaHeroApi };

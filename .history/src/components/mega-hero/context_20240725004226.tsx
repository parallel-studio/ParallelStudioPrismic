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

import { isFilled } from "@prismicio/client";

import { useLayout } from "@/context/layout";
import { defaultColor, useTheme } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

type MegaHeroContextProps = {
    item?: MegaHeroSliceDefaultPrimaryItemsItem | null;
    setItem: Dispatch<
        SetStateAction<MegaHeroSliceDefaultPrimaryItemsItem | undefined>
    >;
    isPopupOpen: boolean;
    setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
    clientMaxLength?: number;
    setIsContainerTouched?: Dispatch<SetStateAction<boolean>>;
    isContainerTouched?: boolean;
};

const MegaHeroContext = createContext<MegaHeroContextProps>({
    item: null,
    setItem: () => {},
    isPopupOpen: false,
    setIsPopupOpen: () => {},
    clientMaxLength: 0,
});

type ProviderProps = {
    children: ReactNode;
    clientLength?: number;
};

const MegaHeroProvider: FC<ProviderProps> = ({
    children,
    clientLength: clientMaxLength = 0,
}) => {
    const [item, setItem] = useState<MegaHeroSliceDefaultPrimaryItemsItem>();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isContainerTouched, setIsContainerTouched] = useState(false);
    const { activeLayout } = useLayout();
    const showMobileVersion = activeLayout === "mobile" || isIOS;

    const { setTheme } = useTheme();

    useEffect(() => {
        if (
            item &&
            isFilled.contentRelationship(item.project) &&
            hasProjectData(item.project)
        ) {
            const color = item.project.data.color as string;
            setTheme({ color });
        } else {
            setTheme({ color: defaultColor });
        }
    }, [item, setTheme]);

    return (
        <MegaHeroContext.Provider
            value={{
                item,
                setItem,
                isPopupOpen,
                setIsPopupOpen,
                clientMaxLength,
                setIsContainerTouched,
                isContainerTouched,
            }}
        >
            {children}
        </MegaHeroContext.Provider>
    );
};

const useMegaHeroApi = () => useContext(MegaHeroContext);

export { MegaHeroProvider, useMegaHeroApi };

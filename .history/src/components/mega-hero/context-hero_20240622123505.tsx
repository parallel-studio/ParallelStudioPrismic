"use client";

import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    use,
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

const hasParentData = <
    TContentRelationshipField extends prismicT.ContentRelationshipField,
>(
    contentRelationshipField: TContentRelationshipField
): contentRelationshipField is TContentRelationshipField & {
    data: {
        parent: Pick<Content.PageDocument["data"], "title">;
    };
} => {
    return (
        prismicH.isFilled.contentRelationship(contentRelationshipField) &&
        typeof contentRelationshipField.data === "object" &&
        contentRelationshipField.data !== null &&
        "parent" in contentRelationshipField.data
    );
};

const MegaHeroProvider: FC<ProviderProps> = ({ children }) => {
    const [item, setItem] = useState<MegaHeroSliceDefaultPrimaryItemsItem>();
    const { setTheme } = useTheme();

    useEffect(() => {
        if (item && "data" in item && "color" in item.data) {
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

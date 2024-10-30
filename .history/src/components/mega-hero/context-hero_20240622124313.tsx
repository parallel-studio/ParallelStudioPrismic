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

import { ContentRelationshipField, isFilled } from "@prismicio/client";

import { useTheme } from "@/context/theme";

import {
    MegaHeroSliceDefaultPrimaryItemsItem,
    PageDocument,
    ProjectDocument,
} from "../../../prismicio-types";

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
    TContentRelationshipField extends ContentRelationshipField,
>(
    contentRelationshipField: TContentRelationshipField
): contentRelationshipField is TContentRelationshipField & {
    data: {
        project: {
            data: Pick<
                ProjectDocument["data"],
                "title" | "subtitle" | "description" | "color" | "categories"
            >;
        };
    };
} => {
    return (
        isFilled.contentRelationship(contentRelationshipField) &&
        typeof contentRelationshipField.data === "object" &&
        contentRelationshipField.data !== null &&
        "parent" in contentRelationshipField.data
    );
};

const MegaHeroProvider: FC<ProviderProps> = ({ children }) => {
    const [item, setItem] = useState<MegaHeroSliceDefaultPrimaryItemsItem>();
    const { setTheme } = useTheme();

    useEffect(() => {
        if (item && isFilled.contentRelationship(item.project)) {
            const color = item.project.data.color;
            setTheme({ color });
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

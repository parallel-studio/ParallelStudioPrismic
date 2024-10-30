"use client";

import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    useContext,
    useState,
} from "react";

type HeroContextProps = {
   project: 
};

const CmsContext = createContext<CmsContextProps>({
    record: { id: "", title: "", slug: "", typename: "" },
    setRecord: () => {},
});

type CmsProviderProps = {
    children: ReactNode;
};

const CmsProvider: FC<CmsProviderProps> = ({ children }) => {
    const [record, setRecord] = useState({
        id: "",
        title: "",
        typename: "",
        slug: "",
    });

    return (
        <CmsContext.Provider value={{ record, setRecord }}>
            {children}
        </CmsContext.Provider>
    );
};

const useCmsApi = () => useContext(CmsContext);

export { CmsContext, CmsProvider, useCmsApi };

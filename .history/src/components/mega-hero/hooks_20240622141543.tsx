import { useMemo } from "react";

import { isFilled } from "@prismicio/client";

import { hasClientData, hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

type Props = {
    item?: MegaHeroSliceDefaultPrimaryItemsItem | null;
};
export const useProject = ({ item }: Props) => {
    const project = useMemo(() => {
        if (
            item &&
            isFilled.contentRelationship(item.project) &&
            hasProjectData(item.project)
        ) {
            return item.project.data;
        }
    }, [item]);

    return { project };
};

export const useClient = ({ item }: Props) => {
    const client = useMemo(() => {
        if (
            item &&
            isFilled.contentRelationship(item.project) &&
            hasClientData(item.project)
        ) {
            return item.project.client.data;
        }
    }, [item]);

    return { client };
};

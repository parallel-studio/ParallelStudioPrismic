import { useMemo } from "react";

import { isFilled } from "@prismicio/client";

import { hasProjectData } from "@/lib/helpers";
import { MegaHeroSliceDefaultPrimaryItemsItem } from "@/types";

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

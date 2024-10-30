import { useMemo } from "react";

import { isFilled } from "@prismicio/client";

import { hasProjectData } from "@/lib/helpers";

import { MegaHeroSliceDefaultPrimaryItemsItem } from "../../../prismicio-types";

type useProjectProps = {
    item?: MegaHeroSliceDefaultPrimaryItemsItem | null;
};
export const useProject = ({ item }: useProjectProps) => {
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

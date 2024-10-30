import { FC } from "react";

import { isFilled } from "@prismicio/client";

import { hasCategoryData, hasClientData } from "@/lib/helpers";

import { ProjectDocument } from "../../../prismicio-types";
import { Info } from "../info/info";

type ProjectInfoProps = {
  project: ProjectDocument["data"];
};

export const ProjectHeroInfo: FC<ProjectInfoProps> = ({ project }) => {
  const client =
    isFilled.contentRelationship(project?.client) &&
    hasClientData(project?.client)
      ? project?.client.data
      : null;

  const categories = () => {
    const array = project?.categories.map((item) => {
      const category = hasCategoryData(item.category)
        ? item.category.data
        : null;
      if (category && isFilled.keyText(category.title)) return category.title;
    });

    return array
      ?.filter((item) => item !== undefined && item !== null)
      .sort()
      ?.join(", ");
  };

  const expertises = categories();

  const color = project.color ?? "#000";

  if (isFilled.keyText(client?.name))
    return <Info client={client.name} expertises={expertises} color={color} />;
};

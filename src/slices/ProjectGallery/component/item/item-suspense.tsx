import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { colord } from "colord";

import { ImageLoading } from "@/components/image/image-loading";
import { WithSuspenseComponent } from "@/components/WithSuspense";
import { defaultColor } from "@/context/theme";
import { hasProjectData } from "@/lib/helpers";
import { ProjectGallerySliceDefaultPrimaryProjectsItem } from "@/types";

import styles from "../project-gallery.module.scss";
import { ProjectGalleryItemServer } from "./item-server";

type GalleryItemProps = {
  item: ProjectGallerySliceDefaultPrimaryProjectsItem;
};

export const ProjectGalleryItem: FC<GalleryItemProps> = ({ item }) => {
  const { project } = item;

  const backgroundColor =
    hasProjectData(project) && isFilled.color(project.data.color)
      ? colord(project.data?.color).lighten(0.2).toHex()
      : defaultColor;

  return (
    <WithSuspenseComponent
      fallback={
        <ImageLoading className={styles.item} style={{ backgroundColor }} />
      }
    >
      <ProjectGalleryItemServer item={item} />
    </WithSuspenseComponent>
  );
};

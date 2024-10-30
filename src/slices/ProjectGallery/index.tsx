import { SliceComponentProps } from "@prismicio/react";

import { ProjectGallerySlice } from "../../../prismicio-types";
import ProjectGalleryComponent from "./component";

/**
 * Props for `ProjectGallery`.
 */
export type ProjectGalleryProps = SliceComponentProps<ProjectGallerySlice>;

/**
 * Component for "ProjectGallery" Slices.ws
 */
const ProjectGallery = (props: ProjectGalleryProps) => {
  // return <></>;
  return <ProjectGalleryComponent {...props} />;
};

export default ProjectGallery;

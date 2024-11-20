import {
  CategoryDocument,
  ClientDocument,
  ProjectDocument,
} from "../../prismicio-types";

export const hasProjectData = (item: object): item is ProjectDocument => {
  return (item as ProjectDocument)?.data !== undefined;
};

export const hasClientData = (item: object): item is ClientDocument => {
  console.log(item?.data ? true : `${item}`);
  return (item as ClientDocument)?.data !== undefined;
};

export const hasCategoryData = (item: object): item is CategoryDocument => {
  return (item as CategoryDocument)?.data !== undefined;
};

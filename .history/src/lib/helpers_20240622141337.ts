import { ClientDocument, ProjectDocument } from "../../prismicio-types";

export const hasProjectData = (item: object): item is ProjectDocument => {
    return (item as ProjectDocument).data !== undefined;
};

export const hasClientData = (item: object): item is ClientDocument => {
    return (item as ClientDocument).data !== undefined;
};

import { ProjectDocument } from "../../prismicio-types";

export const hasProjectData = (project: object): project is ProjectDocument => {
    return (project as ProjectDocument).data !== undefined;
};

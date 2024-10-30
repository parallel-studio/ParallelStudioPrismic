import { FC } from "react";

import { ProjectDocumentData } from "../../../prismicio-types";
import styles from "./project-credits.module.scss";

type ProjectCreditsProps = {
    credits: ProjectDocumentData["credits"];
    color: ProjectDocumentData["color"];
};

export const ProjectCredits: FC<ProjectCreditsProps> = ({ credits, color }) => {
    return <div></div>;
};

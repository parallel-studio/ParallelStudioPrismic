import { FC, Fragment } from "react";

import { ProjectDocumentData } from "../../../prismicio-types";
import styles from "./project-credits.module.scss";

type ProjectCreditsProps = {
    credits: ProjectDocumentData["credits"];
    color: ProjectDocumentData["color"];
};

export const ProjectCredits: FC<ProjectCreditsProps> = ({ credits, color }) => {
    return (
        <div aria-label="Project Credits" className={styles.wrapper}>
            {credits &&
                credits.map((item, index) => {
                    return (
                        <Fragment key={`${index}_${item.title}`}>
                            {" "}
                            <span
                                style={{
                                    color: color ?? undefined,
                                }}
                            >
                                {item.title}
                            </span>{" "}
                            {item.name}
                        </Fragment>
                    );
                })}
        </div>
    );
};

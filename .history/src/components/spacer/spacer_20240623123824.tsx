import { FC, ReactNode } from "react";

import styles from "./spacer.module.scss";

type SpacerProps = {
    children: ReactNode;
};

export const Spacer: FC<SpacerProps> = ({ children }) => {
    return <div className={styles}>{children}</div>;
};

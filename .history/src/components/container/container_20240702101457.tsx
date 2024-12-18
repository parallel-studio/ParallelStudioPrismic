import { FC, ReactNode } from "react";

import styles from "./container.module.scss";

type ContainerProps = {
    children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

import { ElementType, FC, ReactNode } from "react";

import styles from "./spacer.module.scss";

type SpacerProps = {
    children: ReactNode;
    as?: ElementType;
};

export const Spacer: FC<SpacerProps> = ({ children, as: Tag = "div" }) => {
    return <Tag className={styles.wrapper}>{children}</Tag>;
};

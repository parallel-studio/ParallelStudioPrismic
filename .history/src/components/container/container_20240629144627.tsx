import { ElementType, FC, ReactNode } from "react";

import styles from "./container.module.scss";

type ContainerProps = {
    children: ReactNode;
    as?: ElementType;
    spacing?: string;
};

export const Container: FC<ContainerProps> = ({
    children,
    as: Tag = "div",
}) => {
    return <Tag className={styles.wrapper}>{children}</Tag>;
};

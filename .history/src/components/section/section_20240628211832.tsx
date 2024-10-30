import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";

type SectionProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
};
export const Section: FC<SectionProps> = ({
    children,
    as: Tag = "section",
    classname,
}) => {
    return <Tag className={clsx(styles.wrapper, classname)}>{children}</Tag>;
};

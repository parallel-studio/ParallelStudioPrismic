import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./section.module.scss";

type SectionProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "big";
};
export const Section: FC<SectionProps> = ({
    children,
    as: Tag = "section",
    classname,
    variant,
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                classname,
                variant ? styles[variant] : undefined
            )}
        >
            {children}
        </Tag>
    );
};

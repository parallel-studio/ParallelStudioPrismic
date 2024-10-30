import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./section.module.scss";

type SectionProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "big";
} & HTMLAttributes<ElementType>;
export const Section: FC<SectionProps> = ({
    children,
    as: Tag = "section",
    classname,
    variant,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                classname,
                variant ? styles[variant] : undefined
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
};

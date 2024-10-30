import {
    ElementType,
    FC,
    forwardRef,
    HTMLAttributes,
    ReactNode,
    RefAttributes,
} from "react";

import clsx from "clsx";

import styles from "./section.module.scss";

type SectionProps<T extends ElementType> = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "big";
} & HTMLAttributes<T>;

export const Section = forwardRef<T extends ElementType, SectionProps<T>>(
    ({ children, as: Tag = "section", classname, variant, ...rest }, ref) => {
        return (
            <Tag
                ref={ref}
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
    }
);

Section.displayName = "Section";

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

type SectionProps = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "big";
} & HTMLAttributes<ElementType>;

export const Section = forwardRef<any, SectionProps>(
    ({ children, as: Tag = "section", classname, variant, ...rest }, ref) => {
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
    }
);

Section.displayName = "Section";

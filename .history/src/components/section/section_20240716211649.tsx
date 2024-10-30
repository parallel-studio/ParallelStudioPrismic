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
import { Ref } from "@prismicio/client";

type SectionProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    classname?: string;
    variant?: "big";
} & HTMLAttributes<T>;

export const Section = forwardRef<
    RefAttributes<any>,
    SectionProps<ElementType>
>(
    <T extends ElementType>(
        {
            children,
            as: Tag = "section",
            classname,
            variant,
            ...rest
        }: SectionProps<T>,
        ref: RefAttributes<T>
    ) => {
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

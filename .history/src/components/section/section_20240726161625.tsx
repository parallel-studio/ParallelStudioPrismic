import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./section.module.scss";

type SectionProps<T extends ElementType> = {
    children: ReactNode;
    as?: T;
    variant?: "big";
} & HTMLAttributes<T>;

export const Section = forwardRef<HTMLDivElement, SectionProps<ElementType>>(
    ({ children, as: Tag = "section", variant, ...rest }, ref) => {
        const { className, ...etc } = rest;
        return (
            <Tag
                ref={ref}
                className={clsx(
                    styles.wrapper,
                    className,
                    variant ? styles[variant] : undefined
                )}
                {...etc}
            >
                {children}
            </Tag>
        );
    }
);

Section.displayName = "Section";

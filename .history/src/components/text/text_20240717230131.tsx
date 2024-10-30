import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text.module.scss";
import { PrismicTextProps } from "@prismicio/react";

type TextWrapper = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero";
};

export const TextWrapper: FC<TextWrapper> = ({
    children,
    as: Tag = "div",
    classname,
    variant,
}) => {
    return (
        <Tag
            className={clsx(
                styles.wrapper,
                variant ? styles[variant] : undefined,
                classname
            )}
        >
            {children}
        </Tag>
    );
};

export const TextComponent: FC<PrismicTextProps> = ({ slice }) => {
    if (slice.variation === "default")
        return (
            <Section>
                <TextWrapper variant="hero">
                    <PrismicRichText field={slice.primary.text} />
                </TextWrapper>
            </Section>
        );

    if (slice.variation === "textMegaCentered")
        return (
            <Section>
                <PrismicRichText field={slice.primary.text} />
            </Section>
        );
};

import { ElementType, FC, ReactNode } from "react";

import clsx from "clsx";

import { TextProps } from "@/slices/Text";

import { PrismicRichText } from "../PrismicRichText";
import { Section } from "../section/section";
import styles from "./text.module.scss";

type TextWrapper = {
    children: ReactNode;
    as?: ElementType;
    classname?: string;
    variant?: "hero" | "fullscreen";
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

export const TextComponent: FC<TextProps> = ({ slice }) => {
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

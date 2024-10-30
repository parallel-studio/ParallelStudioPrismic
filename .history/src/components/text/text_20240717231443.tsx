import { ElementType, FC, ReactNode } from "react";

import { JSXMapSerializer } from "@prismicio/react";
import clsx from "clsx";

import { TextProps } from "@/slices/Text";

import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import { Section } from "../section/section";
import styles from "./text.module.scss";

const megaFullScreenComponents: JSXMapSerializer = {
    hyperlink: ({ node, children }) => {
        return (
            <LinkArrow link={node.data} variant="go_to" size="small">
                {children}
            </LinkArrow>
        );
    },
};

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
                <TextWrapper variant="fullscreen">
                    <PrismicRichText
                        field={slice.primary.text}
                        components={megaFullScreenComponents}
                    />
                </TextWrapper>
            </Section>
        );
};

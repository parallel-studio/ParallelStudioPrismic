import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

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

type TextWrapper<T extends ElementType> = {
    children: ReactNode;
    as?: T;
} & HTMLAttributes<T>;

export const TextWrapper: FC<TextWrapper<ElementType>> = ({
    children,
    as: Tag = "div",
    ...etc
}) => {
    const { className, ...rest } = etc;
    return (
        <Tag className={clsx(styles.wrapper, className)} {...rest}>
            {children}
        </Tag>
    );
};

export const TextComponent: FC<TextProps> = ({ slice }) => {
    if (slice.variation === "default")
        return (
            <Section>
                <TextWrapper className={styles.hero}>
                    <PrismicRichText field={slice.primary.text} />
                </TextWrapper>
            </Section>
        );

    if (slice.variation === "textMegaCentered")
        return (
            <Section>
                <TextWrapper className={styles.fullscreen}>
                    <PrismicRichText
                        field={slice.primary.text}
                        components={megaFullScreenComponents}
                    />
                </TextWrapper>
            </Section>
        );
};

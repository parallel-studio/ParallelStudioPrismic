import { FC } from "react";

import { JSXMapSerializer } from "@prismicio/react";

import { TextProps } from "@/slices/Text";

import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import { Section } from "../section/section";
import styles from "./text.module.scss";
import { TextWrapper } from "./text-wrapper";

const megaFullScreenComponents: JSXMapSerializer = {
    hyperlink: ({ node, children }) => {
        return (
            <LinkArrow link={node.data} variant="go_to" size="small">
                {children}
            </LinkArrow>
        );
    },
};

export const TextComponent: FC<TextProps> = ({ slice }) => {
    if (slice.variation === "default") {
        const blockSize = slice.primary.minimum_height;

        return (
            <Section>
                <TextWrapper className={styles.hero}>
                    <PrismicRichText field={slice.primary.text} />
                </TextWrapper>
            </Section>
        );
    }

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

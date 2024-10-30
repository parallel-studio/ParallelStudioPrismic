import { FC } from "react";

import { JSXMapSerializer } from "@prismicio/react";

import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { TextProps } from "@/slices/Text";

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

export const Text: FC<TextProps> = ({ slice }) => {
    return (
        <Section>
            <TextWrapper
                className={
                    slice.primary.height_variant === "default"
                        ? styles.hero
                        : undefined
                }
            >
                <PrismicRichText field={slice.primary.text} />
            </TextWrapper>
        </Section>
    );
};

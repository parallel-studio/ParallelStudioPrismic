import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { JSXMapSerializer } from "@prismicio/react";

import { Gallery } from "@/components/gallery/gallery";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";

import styles from "./text.module.scss";
import { TextWrapper } from "../text-with-image/text-wrapper";

const megaFullScreenComponents: JSXMapSerializer = {
    hyperlink: ({ node, children }) => {
        return (
            <LinkArrow link={node.data} variant="go_to" size="small">
                {children}
            </LinkArrow>
        );
    },
};

const DEFAULT_HEIGHT = 300;

export const Text: FC<any> = ({ slice }) => {
    if (isFilled.richText(slice.primary?.text)) {
        const heightVariant = slice.primary?.height_variant ?? "default";
        const height =
            heightVariant === "fixed"
                ? slice.primary?.height ?? DEFAULT_HEIGHT
                : undefined;
        const blockSizeType = slice.primary?.height_variant;
        return (
            <Gallery
                as={"div"}
                gap="small"
                layoutType="default"
                fixedHeightValue={height}
                blockSizeType={blockSizeType}
            >
                <PrismicRichText
                    field={slice.primary.text}
                    components={megaFullScreenComponents}
                />
            </Gallery>
        );
    }
};

"use client";
import { FC } from "react";
import { useWindowSize } from "react-use";

import {
    isFilled,
    KeyTextField,
    LinkField,
    RichTextField,
} from "@prismicio/client";
import clsx from "clsx";
import css from "styled-jsx/css";

import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";
import { useLayout } from "@/context/layout";

import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import styles from "./standout.module.scss";

export type StandoutProps = {
    text: RichTextField;
    link: LinkField;
    linkLabel: KeyTextField;
};

export const StandatoutComponent: FC<StandoutProps> = ({
    text,
    link,
    linkLabel,
}) => {
    const { height } = useWindowSize();
    const { headerSize } = useLayout();

    const { className, styles: styleds } = css.resolve`
        :global(main) {
            min-block-size: calc(${height}px - ${headerSize?.height}px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    `;

    return (
        <Section className={clsx(styles.wrapper, "standout", className)}>
            {styleds}
            <Container variant="double_column" className={styles.container}>
                <div></div>
                <SmallGrid className={styles.right}>
                    <div>
                        <PrismicRichText field={text} />
                    </div>
                    {isFilled.link(link) && isFilled.keyText(linkLabel) && (
                        <div>
                            <LinkArrow link={link} size="small">
                                {linkLabel}
                            </LinkArrow>
                        </div>
                    )}
                </SmallGrid>
            </Container>
        </Section>
    );
};

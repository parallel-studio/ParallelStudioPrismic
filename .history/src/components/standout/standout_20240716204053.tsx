"use client";
import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import css from "styled-jsx/css";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";

import { StandoutSlice } from "../../../prismicio-types";
import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import styles from "./standout.module.scss";

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;

    const { height } = useWindowSize;

    const { text, link, link_label } = slice.primary;

    const { className, styles: styleds } = css.resolve`
        /* Pour cacher la scrollbar sur les navigateurs basés sur Webkit (Chrome, Safari) */
        :global(main) {
            min-block-size: ${document.documentElement.clientHeight}px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    `;

    return (
        <Section className={clsx(styles.wrapper, className)}>
            {styleds}
            <Container variant="double_column" className={styles.container}>
                <div></div>
                <SmallGrid className={styles.right}>
                    <div>
                        <PrismicRichText field={text} />
                    </div>
                    {isFilled.link(link) && isFilled.keyText(link_label) && (
                        <div>
                            <LinkArrow link={link} size="small">
                                {link_label}
                            </LinkArrow>
                        </div>
                    )}
                </SmallGrid>
            </Container>
        </Section>
    );
};
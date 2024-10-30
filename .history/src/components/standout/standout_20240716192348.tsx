"use client";
import { FC } from "react";

import { isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";

import { StandoutSlice } from "../../../prismicio-types";
import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import styles from "./standout.module.scss";

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;

    const { text, link, link_label } = slice.primary;

    return (
        <Section className={styles.wrapper}>
            <Container variant="double_column" className={styles.container}>
                <div></div>
                <div>
                    <SmallGrid className={styles.contacts}>
                        {isFilled.link(link) &&
                            isFilled.keyText(link_label) && (
                                <LinkArrow link={link} size="small">
                                    {link_label}
                                </LinkArrow>
                            )}
                    </SmallGrid>
                </div>
            </Container>
        </Section>
    );
};

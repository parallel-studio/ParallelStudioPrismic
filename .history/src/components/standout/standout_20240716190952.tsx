"use client";
import { FC } from "react";

import { SliceComponentProps } from "@prismicio/react";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";

import { StandoutSlice } from "../../../prismicio-types";
import { SmallGrid } from "../grid/grid";
import styles from "./standout.module.scss";

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;

    const { text, link, link_label } = slice.primary;

    return (
        <Section classname={styles.wrapper}>
            <Container variant="screen_height">
                <Container variant="double_column" className={styles.container}>
                    <div></div>
                    <div>
                        <SmallGrid className={styles.contacts}>
                            <div></div>
                            <div></div>
                        </SmallGrid>
                    </div>
                </Container>
            </Container>
        </Section>
    );
};

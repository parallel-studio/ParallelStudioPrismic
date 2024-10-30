"use client";
import { FC, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import { isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import gsap from "gsap";
import { Observer, ScrollTrigger } from "gsap/all";
import css from "styled-jsx/css";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";
import { useLayout } from "@/context/layout";

import { StandoutSlice } from "../../../prismicio-types";
import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import styles from "./standout.module.scss";
import { animate, useInView } from "framer-motion";

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const ref = useRef<HTMLDivElement>(null);
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;
    const isInview = useInView(ref);

    const { height } = useWindowSize();
    const { headerSize } = useLayout();

    const { text, link, link_label } = slice.primary;

    const { className, styles: styleds } = css.resolve`
        :global(main) {
            min-block-size: calc(${height}px - ${headerSize?.height}px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    `;

    useEffect(() => {
        const element = ref.current;
        if (element) {
            animate(element, {
                opacity: isInview ? 1 : 0,
                y: isInview ? 0 : 100,
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                },
            });
        }
    }, [ref, isInview]);

    return (
        <Section ref={ref} className={clsx(styles.wrapper, className)}>
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

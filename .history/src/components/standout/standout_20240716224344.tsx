"use client";
import { FC, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

import { isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import {
    motion,
    useAnimate,
    useInView,
    useScroll,
    useSpring,
} from "framer-motion";
import css from "styled-jsx/css";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";
import { useLayout } from "@/context/layout";

import { StandoutSlice } from "../../../prismicio-types";
import { useParallax } from "../footer/footer-client";
import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import styles from "./standout.module.scss";

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;
    const [scope, animate] = useAnimate();
    const { scrollYProgress: scrollYParallax } = useScroll({
        offset: ["start end", "end end"],
    });
    const isInview = useInView(scope);

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

    const y = useParallax(
        useSpring(scrollYParallax, {
            duration: 1500,
            bounce: 0,
            stiffness: 10,
        }),
        50
    );

    return (
        <Section
            ref={scope}
            className={clsx(styles.wrapper, "standout", className)}
        >
            {styleds}
            <Container variant="double_column" className={styles.container}>
                <div></div>
                <SmallGrid className={styles.right}>
                    <motion.div
                        style={{
                            y: y,
                        }}
                    >
                        <PrismicRichText field={text} />
                    </motion.div>
                    {isFilled.link(link) && isFilled.keyText(link_label) && (
                        <motion.div
                            style={{
                                y: y,
                            }}
                        >
                            <LinkArrow link={link} size="small">
                                {link_label}
                            </LinkArrow>
                        </motion.div>
                    )}
                </SmallGrid>
            </Container>
        </Section>
    );
};

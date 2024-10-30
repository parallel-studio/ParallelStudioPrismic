"use client";
import { FC } from "react";
import { useWindowSize } from "react-use";

import { isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { motion, useAnimate, useScroll, useSpring } from "framer-motion";
import css from "styled-jsx/css";

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

export const StandatoutComponent: FC<StandoutProps> = ({ slice }) => {
    const [scope, animate] = useAnimate();
    const { scrollYProgress: scrollYParallax } = useScroll({
        offset: ["start end", "end end"],
    });
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

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
    let y = useParallax(
        useSpring(scrollYParallax, {
            duration: 1500,
        }),
        100
    );

    y = isMobileLayoutActive ? 0 : y;

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
                            y: isMobileLayoutActive ? y : 0,
                        }}
                    >
                        <PrismicRichText field={text} />
                    </motion.div>
                    {isFilled.link(link) && isFilled.keyText(link_label) && (
                        <motion.div
                            style={{
                                y: isMobileLayoutActive ? y : 0,
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

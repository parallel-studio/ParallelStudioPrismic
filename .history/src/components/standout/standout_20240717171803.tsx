"use client";
import { FC } from "react";
import { useWindowSize } from "react-use";

import {
    isFilled,
    KeyTextField,
    LinkField,
    RichTextField,
} from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import {
    cubicBezier,
    easeIn,
    easeInOut,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import css from "styled-jsx/css";

import { Container } from "@/components/container/container";
import { Section } from "@/components/section/section";
import { useLayout } from "@/context/layout";

import { StandoutSlice } from "../../../prismicio-types";
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
    const { scrollYProgress: scrollYParallax } = useScroll({
        offset: ["start end", "end end"],
    });
    const { activeLayout } = useLayout();
    const isMobileLayoutActive = activeLayout === "mobile";

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

    const y = useTransform(
        useSpring(scrollYParallax, { bounce: 0, damping: 10, stiffness: 20 }),
        [0, 1],
        [10, 0],
        { ease: easeIn }
    );

    const parallaxValue = isMobileLayoutActive ? 0 : y;

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

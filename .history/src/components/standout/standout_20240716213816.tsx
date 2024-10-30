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

gsap.registerPlugin(ScrollTrigger, Observer);

export type StandoutProps = SliceComponentProps<StandoutSlice>;

export const StandatoutComponent: FC<StandoutProps> = ({ slice, context }) => {
    const ref = useRef<HTMLDivElement>(null);
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;

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
        if (!ref.current) return;
        const element = ref.current;
        const height = element.clientHeight;

        const onBodyWheel: Observer.ObserverCallback = (e) => {
            if (e.deltaY) {
                gsap.to(ref.current, {
                    translateY: -height / 2,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        };

        const setupScrollTrigger = () => {
            ScrollTrigger.observe({
                target: document.body,
                type: "wheel,touch",
                onChangeY: onBodyWheel,
            });
            ScrollTrigger.normalizeScroll(true);
        };

        setupScrollTrigger();

        return () => {
            gsap.killTweensOf(element);
            ScrollTrigger.killAll();
        };
    }, [ref]);

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

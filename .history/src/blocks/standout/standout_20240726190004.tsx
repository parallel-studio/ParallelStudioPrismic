import { ElementType, FC } from "react";

import {
    ColorField,
    isFilled,
    KeyTextField,
    LinkField,
    RichTextField,
} from "@prismicio/client";
import clsx from "clsx";

import { Container } from "@/components/container/container";
import { SmallGrid } from "@/components/grid/grid";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";

import styles from "./standout.module.scss";

export type StandoutProps = {
    text: RichTextField;
    link: LinkField;
    linkLabel: KeyTextField;
    color?: ColorField;
    as?: ElementType;
    className?: string;
};

export const Standatout: FC<StandoutProps> = ({
    text,
    link,
    linkLabel,
    color,
    as = "div",
    className,
}) => {
    return (
        <Section
            className={clsx(styles.wrapper, className)}
            style={{ backgroundColor: color ?? "var(--primary-color)" }}
            as={as}
        >
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

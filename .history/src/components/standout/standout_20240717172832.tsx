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
import { Section } from "@/components/section/section";

import { SmallGrid } from "../grid/grid";
import { LinkArrow } from "../link/link";
import { PrismicRichText } from "../PrismicRichText";
import styles from "./standout.module.scss";

export type StandoutProps = {
    text: RichTextField;
    link: LinkField;
    linkLabel: KeyTextField;
    color?: ColorField;
    as?: ElementType;
};

export const StandatoutComponent: FC<StandoutProps> = ({
    text,
    link,
    linkLabel,
    color,
    as = "div",
}) => {
    return (
        <Section
            className={clsx(styles.wrapper)}
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

import { FC } from "react";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Container } from "@/components/container/container";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { SocialLinks } from "@/components/social-links/social-links";
import { createClient } from "@/prismicio";
import { AboutProps } from "@/slices/About";

import { Eyebrow } from "../eyebrow/eyebrow";
import { SmallGrid } from "../grid/grid";
import styles from "./about.module.scss";

export const AboutComponent: FC<AboutProps> = async ({ slice, context }) => {
    const { params } = context;
    const client = createClient({});
    const footer = await client.getSingle("footer", { lang: params?.lang });
    const links = footer.data?.links;

    const { contact_link_label, contact_link, text, contacts } = slice.primary;
    return (
        <Section classname={styles.wrapper}>
            <Container variant="double_column" className={styles.container}>
                {links && <SocialLinks links={links} theme="light" />}
                <div>
                    <div className={styles.text}>
                        {isFilled.richText(text) && (
                            <PrismicRichText field={text} />
                        )}
                    </div>
                    {isFilled.link(contact_link) && (
                        <LinkArrow
                            link={contact_link}
                            variant="go_to"
                            className={styles.big_link}
                        >
                            {contact_link_label}
                        </LinkArrow>
                    )}
                    {isFilled.group(contacts) && (
                        <SmallGrid className={styles.contacts} as={"ul"}>
                            {contacts.map((contact, index) => (
                                <li key={index}>
                                    <Eyebrow>{contact.title}</Eyebrow>
                                    <LinkArrow
                                        link={contact.link}
                                        variant="go_to"
                                        size="small"
                                    >
                                        {contact.label}
                                    </LinkArrow>
                                </li>
                            ))}
                        </SmallGrid>
                    )}
                </div>
            </Container>
        </Section>
    );
};

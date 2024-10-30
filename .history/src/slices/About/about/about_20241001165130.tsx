import { FC } from "react";

import { isFilled } from "@prismicio/client";

import Standout from "@/blocks/standout";
import { Container } from "@/components/container/container";
import { Eyebrow } from "@/components/eyebrow/eyebrow";
import { SmallGrid } from "@/components/grid/grid";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { SocialLinks } from "@/components/social-links/social-links";
import { createClient } from "@/prismicio";
import { AboutProps } from "@/slices/About";

import styles from "./about.module.scss";

export const About: FC<AboutProps> = async ({ slice, context }) => {
    const { params } = context;
    const client = createClient({});
    const siteFooter = await client.getSingle("settings", {
        lang: params?.lang,
    });
    const links = siteFooter.data?.social_links;

    const { contact_link_label, contact_link, text, contacts, footer } =
        slice.primary;
    return (
        <Section className={styles.wrapper}>
            <div className={styles.container}>
                <Container
                    variant="double_column"
                    className={styles.double_container}
                >
                    {links && (
                        <SocialLinks
                            className={styles.social_links}
                            links={links}
                            theme="light"
                        />
                    )}
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
            </div>
            {isFilled.group(footer) && (
                <div>
                    {footer.map((item, index) => (
                        <Standout
                            key={index}
                            text={item.text}
                            link={item.link}
                            linkLabel={item.link_label}
                            color={item.color}
                            className={styles.standout}
                        />
                    ))}
                </div>
            )}
        </Section>
    );
};

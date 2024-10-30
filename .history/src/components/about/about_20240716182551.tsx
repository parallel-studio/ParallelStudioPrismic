import { FC } from "react";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { LinkArrow } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { SocialLinks } from "@/components/social-links/social-links";

import { Eyebrow } from "../eyebrow/eyebrow";
import styles from "./about.module.scss";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

export const AboutComponent: FC<AboutProps> = ({
    slice,
    context,
}: AboutProps) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;

    const { contact_link_label, contact_link, text, contacts } = slice.primary;
    return (
        <Section classname={styles.wrapper}>
            <Container variant="screen_height">
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
                                className={styles.bigLink}
                            >
                                {contact_link_label}
                            </LinkArrow>
                        )}
                        {isFilled.group(contacts) && (
                            <div className={styles.contacts}>
                                {contacts.map((contact, index) => (
                                    <div key={index}>
                                        <Eyebrow>{contact.title}</Eyebrow>
                                        <LinkArrow
                                            link={contact.link}
                                            variant="go_to"
                                        >
                                            {contact.label}
                                        </LinkArrow>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </Container>
        </Section>
    );
};

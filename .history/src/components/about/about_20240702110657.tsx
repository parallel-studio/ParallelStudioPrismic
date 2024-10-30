import { FC } from "react";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { PageContext } from "@/app/[lang]/[uid]/page";
import { Container } from "@/components/container/container";
import { Link } from "@/components/link/link";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Section } from "@/components/section/section";
import { SocialLinks } from "@/components/social-links/social-links";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

export const AboutComponent: FC<AboutProps> = ({
    slice,
    context,
}: AboutProps) => {
    const footer = (context as PageContext).footer;
    const links = footer.data?.links;
    const contactLabel = slice.primary.contact_link_label;
    const contactLink = slice.primary.contact_link;
    const text = slice.primary.text;
    return (
        <Section>
            <Container variant="screen_height">
                <Container variant="double_column">
                    {links && <SocialLinks links={links} />}
                    <div>
                        {isFilled.richText(text) && (
                            <PrismicRichText field={text} />
                        )}
                        {isFilled.link(contactLink) && (
                            <Link link={contactLink} variant="go_to">
                                {contactLabel}
                            </Link>
                        )}
                    </div>
                </Container>
            </Container>
        </Section>
    );
};

import { ReactNode } from "react";

import * as prismic from "@prismicio/client";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/themes/default/_variables.scss";
import "@/styles/_media.scss";
import { Bounded } from "@/components/Bounded";
import { createClient, repositoryName } from "@/prismicio";

import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});
type RoolLayoutProps = {
    children: ReactNode;
};
export default async function RootLayout({ children }: RoolLayoutProps) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="overflow-x-hidden antialiased">
                <Header />
                {children}
                <PrismicPreview repositoryName={repositoryName} />
            </body>
        </html>
    );
}

async function Header() {
    const client = createClient({});
    const settings = await client.getSingle("settings");
    const navigation = await client.getSingle("navigation");

    return (
        <Bounded as="header" yPadding="sm">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
                <PrismicNextLink
                    href="/"
                    className="text-xl font-semibold tracking-tight"
                >
                    <PrismicText field={settings.data.siteTitle} />
                </PrismicNextLink>
                <nav>
                    <ul className="flex flex-wrap gap-6 md:gap-10">
                        {navigation.data?.links.map((item) => (
                            <li
                                key={prismic.asText(item.label)}
                                className="font-semibold tracking-tight text-slate-800"
                            >
                                <PrismicNextLink field={item.link}>
                                    <PrismicText field={item.label} />
                                </PrismicNextLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </Bounded>
    );
}

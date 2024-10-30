import { ReactNode } from "react";

import * as prismic from "@prismicio/client";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { Bounded } from "@/components/Bounded";
import { Header } from "@/components/header/header";
import { createClient, repositoryName } from "@/prismicio";

import "modern-normalize";

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

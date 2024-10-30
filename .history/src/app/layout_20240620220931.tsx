import { ReactNode } from "react";

import { PrismicPreview } from "@prismicio/next";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { Header } from "@/components/header/header";
import { repositoryName } from "@/prismicio";

import "modern-normalize";

const inter = Inter({
    weight: ["400", "500"],
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

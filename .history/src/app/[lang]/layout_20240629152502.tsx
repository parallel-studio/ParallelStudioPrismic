import { ReactNode } from "react";

import { PrismicPreview } from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import { ResetBodyOverflow } from "@/components/ResetBodyOverflow";
import { ThemeProvider } from "@/context/theme";
import Transitions from "@/lib/transitions";
import { repositoryName } from "@/prismicio";

import "modern-normalize";

const inter = Inter({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});
type RoolLayoutProps = {
    children: ReactNode;
    params: Params;
};

export default async function RootLayout({
    children,
    params,
}: RoolLayoutProps) {
    return (
        <ThemeProvider>
            <html lang={params.lang} className={inter.variable}>
                <script
                    async
                    defer
                    src="https://static.cdn.prismic.io/prismic.js?new=true&repo=prismic-test-effe"
                ></script>
                <Transitions>
                    <Header />
                    <Main>{children}</Main>
                    <Footer params={params} />
                    <PrismicPreview repositoryName={repositoryName} />
                    <ResetBodyOverflow />
                </Transitions>
            </html>
        </ThemeProvider>
    );
}

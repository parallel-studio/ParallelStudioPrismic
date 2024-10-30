import { ReactNode } from "react";

import { PrismicPreview } from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import { ResetBodyOverflow } from "@/components/ResetBodyOverflow";
import { ThemeProvider } from "@/context/theme";
import { SmoothScrolling } from "@/lib/lenis";
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
                    <body>
                    <SmoothScrolling>

                        <Header />
                        <Main>{children}</Main>
                        <PrismicPreview repositoryName={repositoryName} />
                        <ResetBodyOverflow />
                    </body>
                    </SmoothScrolling>

                </html>
            </ThemeProvider>
    );
}

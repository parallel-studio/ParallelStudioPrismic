import { ReactNode } from "react";

import { PrismicPreview } from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { AnimationContainer } from "@/components/animation-container/animation-container";
import { Header } from "@/components/header/header";
import { LayoutProvider } from "@/context/layout";
import { ThemeProvider } from "@/context/theme";
import { VideoProvider } from "@/context/video";
import { LenisSmoothScrolling } from "@/lib/lenis";
import Transitions from "@/lib/transitions";
import { repositoryName } from "@/prismicio";

import "modern-normalize";

const inter = Inter({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-primary",
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
        <html lang={params.lang} className={inter.variable}>
            <ThemeProvider>
                <LayoutProvider>
                    <body>
                        <VideoProvider>{children}</VideoProvider>
                    </body>
                </LayoutProvider>
            </ThemeProvider>
        </html>
    );
}
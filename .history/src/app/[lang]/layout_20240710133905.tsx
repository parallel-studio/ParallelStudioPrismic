import { ReactNode } from "react";

import { PrismicPreview } from "@prismicio/next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Inter } from "next/font/google";

import "@/styles/_globals.scss";
import "@/styles/_tokens.scss";
import "@/styles/_media.scss";
import { AnimationContainer } from "@/components/animation-container/animation-container";
import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/context/theme";
import { SmoothScrolling } from "@/lib/lenis";
import Transitions from "@/lib/transitions";
import { repositoryName } from "@/prismicio";

import "modern-normalize";
import { LayoutProvider } from "@/context/layout";

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
            <script
                async
                defer
                src="https://static.cdn.prismic.io/prismic.js?new=true&repo=prismic-test-effe"
            ></script>
            <ThemeProvider>
                <LayoutProvider>
                    <Transitions>
                        <SmoothScrolling>
                            <Header params={params} />
                            <AnimationContainer>{children}</AnimationContainer>
                            <PrismicPreview repositoryName={repositoryName} />
                        </SmoothScrolling>
                    </Transitions>
                </LayoutProvider>
            </ThemeProvider>
        </html>
    );
}

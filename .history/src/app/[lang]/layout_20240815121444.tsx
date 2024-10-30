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
import { defaultColor, ThemeProvider } from "@/context/theme";
import { VideoProvider } from "@/context/video";
import { LenisSmoothScrolling } from "@/lib/lenis";
import Transitions from "@/lib/transitions";
import { repositoryName } from "@/prismicio";

import "modern-normalize";
import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";

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
                    <Transitions>
                        <body>
                            <LenisSmoothScrolling>
                                <Header params={params} />
                                <AnimationContainer data-scroll-container>
                                    <VideoProvider>
                                        <Main>
                                            <ThemeComponent
                                                theme={defaultColor}
                                            >
                                                {children}
                                            </ThemeComponent>
                                        </Main>
                                    </VideoProvider>
                                </AnimationContainer>
                                <PrismicPreview
                                    repositoryName={repositoryName}
                                />
                            </LenisSmoothScrolling>
                        </body>
                    </Transitions>
                </LayoutProvider>
            </ThemeProvider>
        </html>
    );
}

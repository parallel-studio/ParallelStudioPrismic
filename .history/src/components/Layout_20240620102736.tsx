import { Content } from "@prismicio/client";
import { Header } from "./Header";
import { ReactNode } from "react";

type LayoutProps = {
    navigation: Content.NavigationDocument;
    settings: Content.SettingsDocument;
    children: ReactNode;
};

export function Layout({ navigation, settings, children }: LayoutProps) {
    return (
        <div className="text-slate-800">
            <Header navigation={navigation} settings={settings} />
            <main>{children}</main>
        </div>
    );
}

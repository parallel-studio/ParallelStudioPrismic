import { ReactNode } from "react";

import { SmoothScrolling } from "@/lib/lenis";

type RoolLayoutProps = {
    children: ReactNode;
};

export default async function HomeLayout({ children }: RoolLayoutProps) {
    return (
        <SmoothScrolling
            options={{ orientation: "vertical", lerp: 0.1, duration: 2 }}
        >
            {children}
        </SmoothScrolling>
    );
}

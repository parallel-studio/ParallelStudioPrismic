import { ReactNode } from "react";

import { SmoothScrolling } from "@/lib/lenis";

type RoolLayoutProps = {
    children: ReactNode;
};

export default async function HomeLayout({ children }: RoolLayoutProps) {
    return (
        <SmoothScrolling
            options={{
                // orientation: "horizontal",
                lerp: 0.02,
                duration: 5,
                syncTouch: true,
            }}
        >
            {children}
        </SmoothScrolling>
    );
}

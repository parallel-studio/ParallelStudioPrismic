import { ReactNode } from "react";

import { SmoothScrolling } from "@/lib/lenis";

type RoolLayoutProps = {
    children: ReactNode;
};

export default async function HomeLayout({ children }: RoolLayoutProps) {
    return (
        <SmoothScrolling
            options={{
                lerp: 0.05,
                duration: 0.5,
                syncTouch: true,
            }}
        >
            {children}
        </SmoothScrolling>
    );
}

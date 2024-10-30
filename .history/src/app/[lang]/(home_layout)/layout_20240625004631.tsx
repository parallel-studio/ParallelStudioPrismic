import { SmoothScrolling } from "@/lib/lenis";
import { ReactNode } from "react";

export default async function HomeLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <div><SmoothScrolling options={{ orientation: "horizontal", lerp: 0.1, duration: 2 }}>{children}<SmoothScrolling/></div>
}

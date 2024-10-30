import { ReactNode } from "react";

export const metadata = {
    title: "Next.js",
    description: "Generated by Next.js",
};

export default function RootLayout({
    children,
    works,
}: {
    children: ReactNode;
    works: ReactNode;
}) {
    return (
        <div>
            {works}
            {children}
        </div>
    );
}

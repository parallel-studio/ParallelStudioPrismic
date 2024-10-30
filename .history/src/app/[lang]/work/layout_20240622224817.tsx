import { ReactNode } from "react";

import { createClient } from "@/prismicio";

export const metadata = {
    title: "Next.js",
    description: "Generated by Next.js",
};

export async function WorkLayout({ children }: { children: ReactNode }) {
    const client = createClient({});

    const page = await client.getByUID("page", "home", { lang });

    return <div>{children}</div>;
}

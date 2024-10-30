import { ReactNode } from "react";

import { asLink } from "@prismicio/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Filter } from "@/components/filter/filter";
import { Spacer } from "@/components/spacer/spacer";
import { createClient } from "@/prismicio";

export default async function WorkLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Params;
}) {
    const client = createClient({});

    const id = "category";

    const categories = await client.getAllByType(id, {
        lang: params.lang,
    });

    const items = [
        {
            id: "all",
            label: "All",
            path: "/work",
        },
        ...categories.map((category) => ({
            id: category.uid,
            label: category.data.title as string,
            path: asLink(category) as string,
        })),
    ].sort((a, b) => a.label.localeCompare(b.label));

    return (
        <>
            <Spacer spacing="35svh">
                <Filter items={items} id={id} params={params} />
            </Spacer>
            {children}
        </>
    );
}

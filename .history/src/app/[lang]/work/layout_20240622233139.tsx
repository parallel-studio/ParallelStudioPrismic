import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Filter } from "@/components/filter/filter";
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

    const items = categories
        .map((category) => ({
            id: category.uid,
            label: category.data.title as string,
            value: `/work?${id}=${category.uid}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <>
            <Filter items={items} id={id} />
            <div>{children}</div>
        </>
    );
}

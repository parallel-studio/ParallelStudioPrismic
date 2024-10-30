import { ReactNode } from "react";

import { asLink } from "@prismicio/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Filter } from "@/components/filter/filter";
import { Main } from "@/components/main/main";
import { ScrollReset } from "@/components/ScrollReset";
import { Spacer } from "@/components/spacer/spacer";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
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

    let items = [
        ...categories.map((category) => ({
            id: category.uid,
            label: category.data.title as string,
            path: asLink(category) as string,
        })),
    ].sort((a, b) => a.label.localeCompare(b.label));

    items = [
        {
            id: "all",
            label: "All",
            path: "/work",
        },
        ...items,
    ];

    return (
        <Main>
            <ScrollReset />
            <ThemeComponent theme={defaultColor} />
            <Spacer>
                <Filter items={items} id={id} params={params} />
            </Spacer>
            {children}
        </Main>
    );
}

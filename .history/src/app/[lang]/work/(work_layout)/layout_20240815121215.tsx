import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Main } from "@/components/main/main";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";

export default async function WorkLayout({
    children,
}: {
    children: ReactNode;
    params: Params;
}) {
    return (
        <Main>
            <ThemeComponent theme={defaultColor} />
            {children}
        </Main>
    );
}

import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Filter } from "@/components/filter/filter";
import { Main } from "@/components/main/main";
import { ScrollReset } from "@/components/ScrollReset";
import { Spacer } from "@/components/spacer/spacer";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";
import { LenisSmoothScrolling } from "@/lib/lenis";

export default async function WorkLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Params;
}) {
    return (
        <LenisSmoothScrolling>
            <Main>
                <ScrollReset />
                <ThemeComponent theme={defaultColor} />
                <Spacer>
                    <Filter params={params} />
                </Spacer>
                {children}
            </Main>
        </LenisSmoothScrolling>
    );
}

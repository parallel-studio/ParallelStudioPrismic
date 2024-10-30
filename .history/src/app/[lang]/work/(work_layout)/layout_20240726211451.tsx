import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Filter } from "@/components/filter/filter";
import { Main } from "@/components/main/main";
import { Spacer } from "@/components/spacer/spacer";
import { ThemeComponent } from "@/components/theme";
import { defaultColor } from "@/context/theme";

export default async function WorkLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Params;
}) {
    return (
        <Main>
            <ThemeComponent theme={defaultColor} />
            <Spacer>
                <Filter
                    params={params}
                    style={{ transform: "translateY(var(--px-small))" }}
                />
            </Spacer>
            {children}
        </Main>
    );
}

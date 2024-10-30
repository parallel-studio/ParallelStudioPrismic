import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Footer } from "@/components/footer/footer";
import { Main } from "@/components/main/main";

export default async function WorkLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Params;
}) {
    return (
        <>
            <Main>{children}</Main>
            <Footer params={params} />
        </>
    );
}

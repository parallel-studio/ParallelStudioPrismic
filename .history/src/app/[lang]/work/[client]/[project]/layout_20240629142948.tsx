import { ReactNode } from "react";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function WorkLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Params;
}) {
    return <>{children}</>;
}

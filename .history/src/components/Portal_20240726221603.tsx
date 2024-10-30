"use client";
import { FC, ReactNode } from "react";

import * as PortalComponent from "@radix-ui/react-portal";

type PortalProps = {
    children: ReactNode;
};
export const Portal: FC<PortalProps> = ({ children }) => {
    return (
        <PortalComponent.Root container={document.getElementsByName("main")[0]}>
            {children}
        </PortalComponent.Root>
    );
};

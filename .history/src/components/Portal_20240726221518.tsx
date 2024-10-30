"use client";
import { FC, ReactNode } from "react";

import * as Portal from "@radix-ui/react-portal";

type PortalProps = {
    children: ReactNode;
};
export const About: FC<PortalProps> = ({ children }) => {
    return (
        <Portal.Root container={document.getElementsByName("main")[0]}>
            {children}
        </Portal.Root>
    );
};

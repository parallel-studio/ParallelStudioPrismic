"use client";

import { ReactNode } from "react";
import {
    LocomotiveScrollProvider,
    LocomotiveScrollProviderProps,
} from "react-locomotive-scroll";

export const LocomotiveSmoothScroll = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LocomotiveScrollProviderProps["options"];
}) => {
    return (
        <LocomotiveScrollProvider
            root
            options={{
                ...options,
            }}
        >
            {children}
        </LocomotiveScrollProvider>
    );
};

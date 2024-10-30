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
    options?: LocomotiveScrollProviderProps;
}) => {
    return (
        <LocomotiveScrollProvider
            root
            options={{
                lerp: 0.03,
                duration: 1.3,
                orientation: "vertical",
                ...options,
            }}
        >
            {children}
        </LocomotiveScrollProvider>
    );
};

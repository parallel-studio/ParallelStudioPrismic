"use client";

import { ReactNode } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

export const LocomotiveSmoothScroll = ({
    children,
    options,
}: {
    children: ReactNode;
    options?: LenisOptions;
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

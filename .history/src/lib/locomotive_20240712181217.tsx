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
            options={{
                smooth: true,
                ...options,
            }}
            location={asPath}
            onLocationChange={(scroll: any) =>
                scroll.scrollTo(0, { duration: 0, disableLerp: true })
            }
            containerRef={containerRef}
        >
            {children}
        </LocomotiveScrollProvider>
    );
};

"use client";

import { usePathname } from "next/navigation";
import { ReactNode, RefObject } from "react";
import {
    LocomotiveScrollProvider,
    LocomotiveScrollProviderProps,
} from "react-locomotive-scroll";

export const LocomotiveSmoothScroll = ({
    children,
    options,
    ref,
}: {
    children: ReactNode;
    options?: LocomotiveScrollProviderProps["options"];
    ref?: RefObject<HTMLDivElement>;
}) => {
    const path = usePathname();

    return (
        <LocomotiveScrollProvider
            options={{
                smooth: true,
                ...options,
            }}
            location={path}
            onLocationChange={(scroll: any) =>
                scroll.scrollTo(0, { duration: 0, disableLerp: true })
            }
            // containerRef={ref}
        >
            {children}
        </LocomotiveScrollProvider>
    );
};

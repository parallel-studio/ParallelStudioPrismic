"use client";
// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";
// Next.js ^13.5.2
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

import { Mekuri, MekuriFreezer } from "../../node_modules/@funtech-inc/mekuri";

export const MekuriPageTransition = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    return (
        <Mekuri>
            <MekuriFreezer
                key={`${pathname + performance.now()}`}
                routerContext={LayoutRouterContext}
            >
                {children}
            </MekuriFreezer>
        </Mekuri>
    );
};

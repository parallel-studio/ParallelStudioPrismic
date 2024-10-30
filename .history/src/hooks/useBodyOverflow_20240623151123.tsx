"use client";
import { FC, useEffect } from "react";

import { usePathname } from "next/navigation";

export const ResetBodyOverflow = () => {
    const path = usePathname();

    useEffect(() => {
        document.body.style.overflow = "auto";
    }, [path]);
};

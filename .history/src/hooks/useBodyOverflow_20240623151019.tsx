"use client";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

const useBodyOverflow = () => {
    const path = usePathname();

    useEffect(() => {
        document.body.style.overflow = "auto";
    }, [path]);
};

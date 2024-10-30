"use client";
import { useEffect } from "react";

const useBodyOverflow = () => {
    const path = usePathname();

    useEffect(() => {
        document.body.style.overflow = "auto";
    }, [path]);
};

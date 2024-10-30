"use client";

import { useEffect } from "react";

export const ScrollUp = () => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);
    return null;
};
